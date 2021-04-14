module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000/",
          changOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      },
      host: 'localhost', //only localhost can access the website, 0.0.0.0 can be configured to allow anyone
    }
  }
}
