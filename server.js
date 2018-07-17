const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const koaMount = require('koa-mount')
const { createBundleRenderer } = require('vue-server-renderer')
const ssrDevServer = require('./ssr-dev-server')

const isProd = process.env.NODE_ENV === 'production'
const PORT = 3000
const server = new Koa()
const router = new Router()
const staticFolders = ['js', 'css', 'img']

let renderer
let ssrDevServerReady

if (isProd) {
  renderer = initRenderder()
} else {
  ssrDevServerReady = ssrDevServer.init(
    server,
    path.join(__dirname, 'src/index.template.html'),
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

staticFolders.forEach(folder => {
  server.use(
    koaMount(`/${folder}`, koaStatic(path.join(__dirname, 'dist', folder)))
  )
})

router.get('*', async ctx => {
  if (!isProd) {
    await ssrDevServerReady
  }

  const result = await render(ctx)
  ctx.body = result
})

server.use(router.routes()).use(router.allowedMethods())

server.listen(PORT, err => {
  if (err) console.log(err.message)
  console.log(`Listen on port: ${PORT}`)
})

function render(ctx) {
  ctx.set('Content-Type', 'text/html')

  const context = {
    title: 'Hello, SSR!',
    url: ctx.path
  }

  return renderer.renderToString(context)
}

function createRenderer(bundle, options = {}) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      runInNewContext: false
    })
  )
}

function initRenderder() {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync(
    path.join(__dirname, 'src/index.template.html'),
    'utf-8'
  )
  const renderer = createRenderer(bundle, {
    template,
    clientManifest
  })

  return renderer
}
