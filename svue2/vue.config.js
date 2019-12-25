module.exports = {
  outputDir: 'dist',
  devServer: {
    proxy: { 
      '/baby/u/getUserAddress': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      },
      '/baby/u/addOrUpdateUserAddress': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      },
      '/baby/u': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      },
      '/babyroom/auth/getImgCaptcha': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      },
      '/babyroom/auth/': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      },
      '/baby/p/getProducts': {
        target: 'http://192.168.1.152:8011',
        changeOrigin: true
      }
    }
  }
       
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
