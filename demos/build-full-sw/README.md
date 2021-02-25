综述
workbox镜像，定期同步Google workbox

使用方法
更新本地workbox版本 npm i -g workbox-cli

执行workbox copyLibraries ./src    src下即为所有workbox包。

如果是真正在自己应用上使用，需要修改src/workbox-v6.1.1/workbox-sw.js中的`https://storage.googleapis.com/workbox-cdn/releases/6.1.1`替换成自己cdn的地址



