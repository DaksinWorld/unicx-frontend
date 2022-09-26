<template>
  <div>
    <form class="flex flex-col">
      <input
        v-model="login"
        class="form-control p-3 input"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="password"
        class="form-control p-3 input"
        type="password"
        placeholder="Password"
      />
      <button class="p-3 input" @click="submit">Submit</button>
      <h1 v-if="err" class="text-sm my-2 text-red-300">{{ err }}</h1>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyLoginSection',
  data() {
    return {
      err: '',
      login: '',
      password: '',
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault()
      try {
        const res = await this.$axios.$post('/auth/login', {
          login: this.login.trim(),
          password: this.password.trim(),
        })
        localStorage.setItem('jwt', res.access_token)
        this.$router.push('/')
      } catch (e) {
        this.err = e.response.data.message
      }
    },
  },
}
</script>

<style scoped>

button {
  background-color: var(--green);
}

</style>
