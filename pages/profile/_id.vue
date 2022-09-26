<template>
  <div>
    <MyNav @changeTheme="changeTheme" />
    <div class="container flex flex-col items-start">
      <span>{{ data.name }} - {{ data.email }}</span>
      <button class="logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'

export default {
  name: 'UserProfile',
  components: {
    MyNav,
  },
  data() {
    return {
      data: [],
    }
  },
  async mounted() {
    try {
      if(!localStorage.getItem('jwt')) {
        this.$router.push('/auth')
      } else {
        this.data = await this.$axios.$get('/auth/' + this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    changeTheme() {
      const currTheme = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--primary')

      if (currTheme === '#181a1e') {
        document.documentElement.style.setProperty('--primary', '#ffffff')
        document.documentElement.style.setProperty('--bgColor', '#eaeef2')
        document.documentElement.style.setProperty('--textColor', '#000')
      } else {
        document.documentElement.style.setProperty('--primary', '#181a1e')
        document.documentElement.style.setProperty('--bgColor', '#0d0e10')
        document.documentElement.style.setProperty('--textColor', '#fff')
      }
    },
    logout() {
      localStorage.removeItem('jwt')
      this.$router.push('/auth')
    }
  },
}
</script>

<style scoped>
.container {
  margin-top: 100px !important;
}

.logout {
  background: #1B3B49;
  padding: 10px 15px;
  margin-top: 5px;
  border-radius: 10px;
  transition: background-color .3s ease-in-out;
}

.logout:hover {
  background-color: var(--primary);
}

</style>
