<template>
  <div class="container flex justify-center">
    <form @submit.prevent="submit">
      <client-only placeholder="loading...">
        <ckeditor-nuxt
          v-model="content"
          class="w-50 input"
          :config="editorConfig"
        />
      </client-only>
      <button class="p-3 border text-white" type="submit">Change</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductId',
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    return {
      editorConfig: {},
      content: '',
      data: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async submit() {
      try {
        await this.$axios.$patch(
          '/docs/' + this.data[0]._id,
          {
            htmlText: this.content,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
      } catch (e) {}
    },
    async fetchData() {
      try {
        const res = await this.$axios.$get('/docs')
        this.content = res[0].htmlText
        this.data = res
      } catch (e) {}
    },
  },
}
</script>

<style>
.input {
  width: 80% !important;
  color: var(--primary);
  background: var(--primary);
  border: 3px solid var(--textColor);
  padding: 10px 5px;
}

* {
  color: black;
}
</style>
