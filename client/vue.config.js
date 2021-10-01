module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'server:3000',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug',
      },
    },
  },
  transpileDependencies: [
    'vuetify'
  ],
};
