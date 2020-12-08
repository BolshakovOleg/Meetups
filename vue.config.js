module.exports = {
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
      proxy: {
        "/api": {
          target: process.env.API_PROXY_TARGET,
          //pathRewrite: {'^/api' : ''},
          changeOrigin: true
          //secure: true
        }
      }
    }
  }
};
