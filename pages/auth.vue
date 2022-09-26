<template>
  <div>
    <MyNav @changeTheme="changeTheme" />
    <div class="container flex justify-center">
      <div v-if="currentAuth === 'sign-in'" class="text-center card">
        <span class="text-[20px] text-gray font-medium mt-[16px]">Social Profile</span>
        <div class="tabs flex justify-around mt-[16px]">
          <span class="mx-2 cursor-pointer hover-el rounded-[15px]" @click="currentAuth = 'sign-in'" :class="{'active': currentAuth === 'sign-in'}">
            LOG IN
          </span>
          <span class="mx-2 cursor-pointer hover-el rounded-[15px]" @click="currentAuth = 'sign-up'" :class="{'active': currentAuth !== 'sign-in'}">
            CREATE ACCOUNT
          </span>
        </div>
        <div class="flex flex-col mt-[32px]">
          <i class="fa-regular fa-user text-[60px]"></i>
          <h1 class="text-[40px] font-bold">Log In</h1>
        </div>
        <MyLoginSection @changeAuthType="changeAuthType" />
      </div>
      <div v-else class="text-center card">
        <span class="text-[20px] text-gray font-medium mt-[16px]">Social Profile</span>
        <div class="tabs flex justify-around mt-[16px]">
          <span class="mx-2 cursor-pointer hover-el rounded-[15px]" @click="currentAuth = 'sign-in'" :class="{'active': currentAuth === 'sign-in'}">
            LOG IN
          </span>
          <span class="mx-2 cursor-pointer hover-el rounded-[15px]" @click="currentAuth = 'sign-up'" :class="{'active': currentAuth !== 'sign-in'}">
            CREATE ACCOUNT
          </span>
        </div>
        <div class="flex flex-col mt-[32px]">
          <i class="fa-regular fa-user text-[60px]"></i>
          <h1 class="text-[40px] font-bold">Create Account</h1>
        </div>
        <MyRegisterSection @changeAuthType="changeAuthType" />
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'

export default {
  name: 'AuthComponent',
  components: {
    MyNav
  },
  data() {
    return {
      currentAuth: 'sign-in',
    }
  },
  methods: {
    changeAuthType(val) {
      this.currentAuth = val
    },
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

<style scoped>

* {
  color: var(--textColor);
}

.card {
  width: 50%;
  padding: 32px;
  background-color: var(--primary);
  border-radius: 20px;
}

.tabs span {
  color: var(--textColor);
  font-weight: 500;
  font-size: 16px;
}

.active {
  color: var(--green) !important;
}

.text-gray {
  color: var(--grayTextColor);
}

</style>
