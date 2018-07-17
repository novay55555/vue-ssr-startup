<template>
  <dl class="lists">
    <dt>{{title}}</dt>
    <dd v-for="(item, index) in data" :key="index">
      <a :href="item.url">{{item.name}}</a>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'lists',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
dt {
  margin-bottom: 15px;
  font-size: 30px;
  line-height: 1.5;
}

dd {
  margin-left: 0;
  display: inline-block;
  width: 33.33333%;
}

dd a {
  line-height: 2;
  color: #42b983;
}
</style>
