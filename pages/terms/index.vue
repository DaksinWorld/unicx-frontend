<template>
  <div>
    <MyNav @changeTheme="changeTheme" />
    <div class="container">
      <main class="flex justify-center">
        <div class="flex flex-col bx">
          <div class="card-header flex items-center">
            <nuxt-link to="/" class="flex items-center justify-center arond mr-2">
              <i class="fa-solid fa-arrow-left">
              </i>
            </nuxt-link>
            Terms and Conditions
          </div>
          <div class="card w-full">
            <div v-html="data"></div>
          </div>
        </div>
      </main>
    </div>
    <MyFooter/>
  </div>
</template>

<script>
import MyNav from '@/components/Nav'

export default {
  name: 'TermsPage',
  components: { MyNav },
  data: () => ({
    data: ''
  }),
  mounted() {
    this.fetchData()
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
        document.documentElement.style.setProperty('--underCardColor', '#F4F4F9')
        document.documentElement.style.setProperty('--hoverColor', '#c4c4c4')
      } else {
        document.documentElement.style.setProperty('--primary', '#181a1e')
        document.documentElement.style.setProperty('--bgColor', '#0d0e10')
        document.documentElement.style.setProperty('--textColor', '#fff')
        document.documentElement.style.setProperty('--underCardColor', '#17181B')
        document.documentElement.style.setProperty('--hoverColor', '#27282b')
      }
    },
    async fetchData() {
      try {
        const res = await this.$axios.$get('/constants')
        this.data = res[2].text
      } catch (e) {

      }
    }
  },
}
</script>

<style scoped>

.arond {
  background: var(--primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: background-color .2s ease-in-out;
}

.arond:hover {
  background: #aaa;
}

.card {
  border-radius: 0 0 20px 20px;
  max-width: 770px;
  background: var(--primary);
}

.bx {
  border-radius: 20px;
  box-shadow: 0 5.40728px 10.8146px rgba(0,0,0,.3)!important;
}

.card-header {
  background: #151617;
  border-radius: 20px 20px 0 0 ;
  color: #b9babb;
  font-size: 20px;
  font-weight: 500;
  padding: 16px;
}

a {
  transition: all .2s ease-in-out;
}

a:hover {
  background-color: #1c2228;
}


main {
  min-height: calc(100vh - 300px);
}

</style>
<style>
p {
  margin-bottom: 16px;
}
</style>
