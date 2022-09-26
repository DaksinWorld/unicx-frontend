<template>
  <div>
    <MyNav @changeTheme="changeTheme" />
    <div class="container">
      <MyMain />
    </div>
    <MyFooter/>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'
import MyMain from '~/components/Main'

export default {
  name: 'IndexPage',
  components: { MyNav, MyMain },
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
  },
}
</script>

<style></style>
