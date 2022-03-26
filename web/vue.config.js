
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const vueConfig = {
  outputDir: 'dist',
  publicPath: './',
  devServer: {

  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
  }
}
module.exports = vueConfig