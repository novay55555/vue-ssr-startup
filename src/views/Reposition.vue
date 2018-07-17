<template>
  <div class="reposition">
    <Lists
      v-if="!loading"
      :title="$route.params.type + ' repositions'" 
      :data="repos" 
    />
    <p v-if="loading" class="loading-tips">Now Loading...</p>
  </div>
</template>

<script>
import Lists from '../components/Lists.vue'

export default {
  name: 'reposition',
  components: {
    Lists
  },
  data() {
    return {
      loading: false
    }
  },
  asyncData({ store, route }) {
    const { type } = route.params
    const repositions = store.state.repos[type]

    if (repositions) return Promise.resolve()

    return store.dispatch('saveRepos', {
      q: `language:${type}`,
      repoType: type
    })
  },
  mounted() {
    const { type } = this.$route.params
    const repositions = this.$store.state.repos[type]

    if (!repositions) {
      this.fetchRepos(type, type)
    }
  },
  watch: {
    $route: async function(newVal, oldVal) {
      if (newVal.params.type !== oldVal.params.type) {
        const { type } = newVal.params
        const repositions = this.$store.state.repos[type]

        if (!repositions) {
          this.fetchRepos(type, type)
        }
      }
    }
  },
  computed: {
    repos() {
      return this.$store.state.repos[this.$route.params.type] || []
    }
  },
  methods: {
    async fetchRepos(query, repoType) {
      this.loading = true
      await this.$store.dispatch('saveRepos', { q: query, repoType })
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-tips {
  margin-top: 30px;
  font-size: 24px;
  text-align: center;
  animation: fade 0.5s ease-in-out infinite;
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
