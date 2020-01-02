module.exports = {
  outputDir: 'dist',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    https:            false,
    disableHostCheck: true,
    proxy: { 
      '/baby/u/getUserAddress': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/u/addOrUpdateUserAddress': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/u': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/babyroom/auth/getImgCaptcha': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/babyroom/auth/': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/p/getProducts': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/p/getProductSku/': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/o/addShoppingCart': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/o/placeOrder': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/o/': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      },
      '/baby/p/': {
        target: 'http://192.168.1.147:8011',
        changeOrigin: true
      }
    }
  }
       
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
