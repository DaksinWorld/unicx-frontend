<template>
  <div>
    <MyNav @changeTheme="changeTheme" />
    <MyPageMain />
    <MyFooter/>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'

export default {
  name: 'ProductPage',
  components: {
    MyNav,
  },
  data: () => ({
    data: [],
    address: '',
    lockedConstant: ''
  }),
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
        document.documentElement.style.setProperty('--tabBg', '#fff')
      } else {
        document.documentElement.style.setProperty('--primary', '#181a1e')
        document.documentElement.style.setProperty('--bgColor', '#0d0e10')
        document.documentElement.style.setProperty('--textColor', '#fff')
        document.documentElement.style.setProperty('--underCardColor', '#17181B')
        document.documentElement.style.setProperty('--tabBg', '#18191C')
      }
    },
    async fetchData() {
      try {
        const res = await this.$axios.$get('/product/find/' + this.$route.params.id)
        const constant = await this.$axios.$post('/constants/find', {
          name: 'locked'
        })

        const address = await this.$axios.$post('/constants/find', {
          name: 'address'
        })

        this.address = address.text
        this.lockedConstant = constant.text

        this.data = res
        if (this.data.type === 'Upcoming' || this.data.type === 'Success') {
          this.currentTab = 'info'
        }
        this.isLoaded = true
      } catch (e) {

      }
    },
  },
}
</script>

<style scoped></style>
