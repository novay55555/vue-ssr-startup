# vue-ssr-startup

Vue-cli3 is awesome, but due to [#5350](https://github.com/vuejs/vue/issues/5350), I have to config myself in order to make a workflow fluently, so this project came in

## Get started

```
yarn install # or npm install
npm start
```

open browser and visit `http://localhost:3000/`

## Features

- vue + vue-router + vuex + koa2
- Hot-reload supported when developing by SSR
- Progressbar effect when route change and needed to fetch asynchronous data
- Loading effect for the same dynamic route, eg. `/awesome/:id`
- Automatic code formatting && eslint triggered by pre-commit hook
- client develope supported

## Npm Scripts

```
# start the ssr project
npm start
npm run dev:server

# start the client project
npm run dev:client

# build for the client project
npm run build:client

# build for the SSR project
npm run build

# run production for the SSR project
npm run production
```

## Known issues && hacked

> Sometimes Vue will warn `[Vue warn]: Property or method "_ssrNode" is not defined on the instance but referenced during render` when started the server

You can remove and reinstall `koa-webpack-middleware`, but I have no idea why this will happen

## Another vue-ssr startup

- [vue-cli-ssr-example](https://github.com/eddyerburgh/vue-cli-ssr-example)

- [vue-ssr-starter-kit](https://github.com/doabit/vue-ssr-starter-kit)