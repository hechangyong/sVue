module.exports = {
  outputDir: 'dist',
  devServer: {
    proxy: { 
      '/baby/u/getUserAddress': {
        target: 'http://192.168.1.150:8011',
        changeOrigin: true
      },
      '/baby/u/addOrUpdateUserAddress': {
        target: 'http://192.168.1.150:8011',
        changeOrigin: true
      }
    }
  }
       
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
