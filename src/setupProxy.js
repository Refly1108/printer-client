const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware("/service", {
  //     target: "http://39.108.114.45:80/",
  //     changeOrigin: true,
  //   })
  // );

  app.use(
    createProxyMiddleware("/spring", {
      target: "http://175.178.13.221/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/service", {
      target: "http://175.178.13.221/",
      changeOrigin: true,
    })
  );
  
  app.use(
    createProxyMiddleware("/test", {
      target: "https://api.weixin.qq.com",
      changeOrigin: true,
      pathRewrite: { "^/test": "" },
    })
  );

  app.use(
    createProxyMiddleware("/map", {
      target: "https://apis.map.qq.com",
      changeOrigin: true,
      pathRewrite: { "^/map": "" },
    })
  );

};
