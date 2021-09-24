module.exports = {
  devServer: {
    host: 'fe.budgetmonitoring.test'
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/app.scss";`
      }
    }
  }
}
