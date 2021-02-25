importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);
/* global importScripts, workbox */

if (workbox) {
	console.log(`Workbox is loaded 🎉`);

	workbox.core.setCacheNameDetails({
		prefix: 'workbox-demo',
	});

	const matchHTML = ({ url }) => {
		return ['/', '/index.html'].includes(url.pathname);
	};

	workbox.routing.registerRoute(
		matchHTML,
		new workbox.strategies.StaleWhileRevalidate()
	);

	workbox.routing.registerRoute(
		({ url }) => /\.(?:js|css)$/.test(url.pathname),
		new workbox.strategies.StaleWhileRevalidate()
	);

	workbox.routing.registerRoute(
		({ url }) => /\.(?:jpg|jpeg|webp|png|gif)/.test(url.pathname),
		new workbox.strategies.CacheFirst({
			cacheName: 'images-cache',
			plugins: [
				new workbox.cacheableResponse.CacheableResponsePlugin({
					statuses: [0, 200],
				}),
			],
		})
	);
} else {
	console.log(`Workbox didn't load 😬`);
}
