module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false
}
