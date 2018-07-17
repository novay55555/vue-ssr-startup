<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="nav">
      Program Pages:
      <router-link
        v-for="(name, index) in types" 
        :key="index"
        :to="'/repo/' + name"
      >
        {{name}}
      </router-link>
      <p>
        Another Pages:  <router-link to="/helloworld">helloworld</router-link>
      </p>
    </div>
    <router-view></router-view>
    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      types: [
        'javascript',
        'python',
        'golang',
        'java',
        'rust',
        'php',
        'clang',
        'c++'
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav a {
  display: inline-block;
  margin: 0 10px;
  font-size: 30px;
}
</style>
