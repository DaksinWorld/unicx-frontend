<template>
  <div>
    <form @submit.prevent class="flex flex-col">
      <input
        v-model="firstName"
        class="form-control p-3 input"
        type="text"
        placeholder="First Name"
      />
      <input
        v-model="lastName"
        class="form-control p-3 input"
        type="text"
        placeholder="Last Name"
      />
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
      <input
        v-model="repeatPassword"
        class="form-control p-3 input"
        type="password"
        placeholder="Repeat Password"
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
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: ''
    }
  },
  methods: {
    async submit() {
      if(this.password !== this.repeatPassword) {
        this.err = 'Passwords are not the same'
      } else {
        try {
          const res = await this.$axios.$post('/auth/register', {
            login: this.login.trim(),
            name: this.firstName.trim() + ' ' + this.lastName.trim(),
            password: this.password.trim(),
          })
          localStorage.setItem('jwt', res.access_token)
          this.$router.push('/')
        } catch (e) {
          this.err = e.response.data.message
        }
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
