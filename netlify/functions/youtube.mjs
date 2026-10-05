// Netlify Function: latest uploads from The Witch on the Ridge YouTube channel.
// Served at /.netlify/functions/youtube and read by assets/js/youtube-feed.js.
// Uses the channel's public RSS feed (newest 15 uploads), so no API key is needed.

const HANDLE = "TheWitchontheRidge";

// Optional: paste the channel's "UC..." id here to skip looking it up from the handle.
const CHANNEL_ID = "";

const YT_HEADERS = {
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
	"Accept-Language": "en-US,en;q=0.9",
	// Skips YouTube's cookie consent page.
	"Cookie": "SOCS=CAI"
};

let channelId = CHANNEL_ID;

export default async () => {
	try {
		channelId = channelId || await lookupChannelId();
		const feed = await fetch("https://www.youtube.com/feeds/videos.xml?channel_id=" + channelId, { headers: YT_HEADERS });
		if (!feed.ok) throw new Error("feed returned " + feed.status);

		const entries = parseFeed(await feed.text());
		const videos = await Promise.all(entries.map(async (video) => ({
			...video,
			isShort: video.url.includes("/shorts/") || await isShort(video.id)
		})));

		return json({ channelId, videos }, {
			"Cache-Control": "public, max-age=300",
			// Cache on Netlify's CDN so YouTube is only asked every half hour.
			"Netlify-CDN-Cache-Control": "public, durable, max-age=1800, stale-while-revalidate=86400"
		});
	} catch (error) {
		console.error("youtube feed:", error);
		return json({ error: "Could not load videos" }, { "Cache-Control": "no-store" }, 502);
	}
};

async function lookupChannelId() {
	const res = await fetch("https://www.youtube.com/@" + HANDLE, { headers: YT_HEADERS });
	const html = await res.text();
	const match = html.match(/feeds\/videos\.xml\?channel_id=(UC[\w-]{22})/)
		|| html.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/)
		|| html.match(/"externalId":"(UC[\w-]{22})"/);
	if (!match) throw new Error("channel id not found for @" + HANDLE + " (status " + res.status + ")");
	return match[1];
}

// youtube.com/shorts/<id> answers 200 for a Short and redirects for a regular video.
async function isShort(id) {
	try {
		const res = await fetch("https://www.youtube.com/shorts/" + id, {
			method: "HEAD",
			redirect: "manual",
			headers: YT_HEADERS,
			signal: AbortSignal.timeout(4000)
		});
		return res.status === 200;
	} catch {
		return false;
	}
}

function parseFeed(xml) {
	return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
		.map(([, entry]) => {
			const views = entry.match(/<media:statistics views="(\d+)"/);
			return {
				id: tag(entry, "yt:videoId"),
				title: tag(entry, "title"),
				published: tag(entry, "published"),
				url: (entry.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] || "",
				views: views ? Number(views[1]) : null
			};
		})
		.filter((video) => /^[\w-]{11}$/.test(video.id));
}

function tag(xml, name) {
	const match = xml.match(new RegExp("<" + name + ">([\\s\\S]*?)</" + name + ">"));
	return match ? decodeEntities(match[1].trim()) : "";
}

function decodeEntities(text) {
	return text
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function json(body, headers, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json; charset=utf-8", ...headers }
	});
}
