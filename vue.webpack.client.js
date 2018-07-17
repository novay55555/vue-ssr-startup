const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  entry: './src/entry-client.js',
  target: 'web',
  plugins: [new VueSSRClientPlugin()]
}
