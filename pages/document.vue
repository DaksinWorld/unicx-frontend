<template>
  <div>
    <MyNav />
    <div class="container">
      <h1 class="text-[40px] font-bold">Docs</h1>
      <hr class="my-2" />
      <div v-if="data[0]" v-html="data[0].htmlText"></div>
    </div>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'

export default {
  name: 'DocumentPage',
  components: {
    MyNav,
  },

  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const res = await this.$axios.$get('/docs')
        this.data = res
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}
</style>
