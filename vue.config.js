const clientWebpackConfig = require('./vue.webpack.client')
const serverWebpackConfig = require('./vue.webpack.server')

const webpackConfigMap = {
  node: serverWebpackConfig,
  client: clientWebpackConfig
}

module.exports = {
  lintOnSave: false,
  // ssr-dev-server会读取到通过这里合并后默认webpack配置, 因此这里应该使用最原始的默认数据
  // 其他任务则根据cross-env传递过来的环境进行配置
  configureWebpack: webpackConfigMap[process.env.WEBPACK_ENV] || {
    entry: './src/entry-client.js'
  }
}
