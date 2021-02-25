# WorkBox

Workbox官方文档：
* workbox-sw.js：https://developers.google.com/web/tools/workbox/modules/workbox-sw
* workbox cache API： https://developers.google.com/web/tools/workbox/guides/get-started（使用PWA需要webpack/rollup等把npm包编译为es5单文件）
* workbox-sw es6源码：https://github.com/GoogleChrome/workbox/blob/v6/packages/workbox-sw/controllers/WorkboxSW.mjs
* 同步官方workbox cnd：https://developers.google.com/web/tools/workbox/modules/workbox-cli（命令：workbox copyLibraries third_party/workbox/）


## 生成自己的workbox库

当前github地址的完整workbox库：https://lq782655835.github.io/workbox/demos/build-full-sw/src/workbox-v6.1.1/workbox-sw.js

更新本地workbox版本 npm i -g workbox-cli

执行workbox copyLibraries ./src    src下即为所有workbox包。

> 如果是真正在自己应用上使用，需要修改src/workbox-v6.1.1/workbox-sw.js中的`https://storage.googleapis.com/workbox-cdn/releases/6.1.1`替换成自己cdn的地址


详细见[demos/build-full-sw](./demos/build-full-sw/readme.md)


## 本地测试workbox效果

详细见[demos/src/workbox-sw](./demos/src/workbox-mobile/index.html)

核心讲解：

### 1. 注册sw

``` js
<script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('./sw.js')
        })
      }
    </script>
```

### 2. 加载workbox库 + cache api确定缓存策略

``` js
importScripts(
	'https://lq782655835.github.io/workbox/demos/build-full-sw/src/workbox-v6.1.1/workbox-sw.js' // 自己库
	// 'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js' // 官方库
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

```
