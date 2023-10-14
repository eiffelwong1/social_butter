/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  tailwind: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  browserNodeBuiltinsPolyfill: {
    //modules: { url: true, querystring: true, child_process: true, punycode: true, tls: true, net: true, assert: true, crypto: true, buffer: true, util: true, stream: true, events: true, https: true,  http: true, os:true, path:true,zlib:true, fs:true }
  }
}
