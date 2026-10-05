/*
	Fills every [data-youtube-feed] element with the latest videos and Shorts from
	The Witch on the Ridge, using the Netlify function in netlify/functions/youtube.mjs.
	Optional attributes: data-max-videos (default 3), data-max-shorts (default 8).
	If the feed can't load, the element stays hidden and the page's Subscribe button
	still links to the channel.
*/
(function() {

	var feeds = document.querySelectorAll('[data-youtube-feed]');

	if (!feeds.length || !window.fetch)
		return;

	fetch('/.netlify/functions/youtube')
		.then(function(res) {
			if (!res.ok) throw new Error('youtube feed returned ' + res.status);
			return res.json();
		})
		.then(function(data) {
			Array.prototype.forEach.call(feeds, function(el) {
				render(el, data.videos || []);
			});
		})
		.catch(function(error) {
			console.warn(error);
		});

	function render(el, videos) {
		var maxVideos = parseInt(el.getAttribute('data-max-videos'), 10) || 3,
			maxShorts = parseInt(el.getAttribute('data-max-shorts'), 10) || 8,
			longform = videos.filter(function(v) { return !v.isShort; }).slice(0, maxVideos),
			shorts = videos.filter(function(v) { return v.isShort; }).slice(0, maxShorts);

		if (longform.length) el.appendChild(group('Latest Videos', 'yt-grid', longform));
		if (shorts.length) el.appendChild(group('Shorts', 'yt-shorts', shorts));
		if (longform.length || shorts.length) el.classList.add('is-loaded');
	}

	function group(heading, listClass, videos) {
		var wrap = make('div', 'yt-group'),
			title = make('h4', 'yt-heading', heading),
			list = make('div', listClass);

		videos.forEach(function(video) { list.appendChild(card(video)); });
		wrap.appendChild(title);
		wrap.appendChild(list);
		return wrap;
	}

	function card(video) {
		var article = make('article', 'yt-card' + (video.isShort ? ' is-short' : '')),
			media = make('div', 'yt-media'),
			play = make('button', 'yt-thumb'),
			img = make('img'),
			info = make('div', 'yt-info'),
			link = make('a', 'yt-title', video.title),
			meta = make('span', 'yt-meta', details(video));

		play.type = 'button';
		play.setAttribute('aria-label', 'Play ' + video.title);
		img.src = 'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg';
		img.alt = '';
		img.loading = 'lazy';
		play.appendChild(img);
		play.appendChild(make('span', 'yt-play'));
		media.appendChild(play);

		// Swap the thumbnail for the real player only when someone taps it, so the page stays fast.
		play.addEventListener('click', function() {
			var frame = make('iframe');
			frame.src = 'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1&rel=0&playsinline=1';
			frame.title = video.title;
			frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			frame.allowFullscreen = true;
			media.replaceChild(frame, play);
		});

		link.href = video.isShort ? 'https://www.youtube.com/shorts/' + video.id : 'https://www.youtube.com/watch?v=' + video.id;
		link.target = '_blank';
		link.rel = 'noopener';
		info.appendChild(link);
		if (meta.textContent) info.appendChild(meta);

		article.appendChild(media);
		article.appendChild(info);
		return article;
	}

	function details(video) {
		var parts = [];
		if (typeof video.views === 'number')
			parts.push(video.views.toLocaleString() + (video.views === 1 ? ' view' : ' views'));
		if (video.published)
			parts.push(timeAgo(video.published));
		return parts.join(' · ');
	}

	function timeAgo(iso) {
		var seconds = (Date.parse(iso) - Date.now()) / 1000,
			units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];

		if (isNaN(seconds)) return '';
		if (!window.Intl || !Intl.RelativeTimeFormat) return new Date(iso).toLocaleDateString();

		var format = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
		for (var i = 0; i < units.length; i++)
			if (Math.abs(seconds) >= units[i][1])
				return format.format(Math.round(seconds / units[i][1]), units[i][0]);
		return 'just now';
	}

	function make(tagName, className, text) {
		var el = document.createElement(tagName);
		if (className) el.className = className;
		if (text) el.textContent = text;
		return el;
	}

})();
