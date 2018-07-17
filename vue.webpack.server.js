const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/entry-server.js',
  output: {
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  plugins: [new VueSSRServerPlugin()],
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  })
}
