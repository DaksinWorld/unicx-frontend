<template>
  <div>
    <nav class="nav px-5">
      <div class="justify-between flex items-center h-full">
        <div class="flex items-center">
          <a href="/" class="mr-[16px]">
            <img
              src="/logo.png"
              width="220px" alt="logo">
          </a>
          <NuxtLink class="text-[#fafafa] hover-el font-medium rounded-[50px]" to="/">
            Dashboard
          </NuxtLink>
          <NuxtLink class="text-[#fafafa] hover-el font-medium rounded-[50px]" to="/document">
            Docs
          </NuxtLink>
<!--          <a :href="telegram" target="_blank">
            <i class="fa-brands fa-telegram text-[24px]"></i>
          </a>-->
        </div>
        <div class="flex items-center">
          <div v-if="profile.email" class="cursor-pointe p-2" @click="isModalActive = true">
            <i class="fa-regular fa-user text-[16px] color-primary"></i>
          </div>
          <nuxt-link to="/auth" class="cursor-pointe p-2" v-else>
            <img width="20" src="/user-icon.png" alt="user-icon">
          </nuxt-link>
          <div v-if="isModalActive" class="modal__bg" @click="isModalActive = false">
            <div class="modal" @click.stop>
              <div class="flex items-start flex-col">
                <div class="flex">
                  <div class="bg-gray-300 rounded-[50%] flex items-center justify-center h-[44px] w-[44px] mr-2">
                    <img src="/user-pfp.png" alt="user-pfp">
                  </div>
                  <div v-if="profile" class="flex flex-col">
                    <span>{{(profile.email.split('@')[0].substr(0,3) + '***' + profile.email.split('@')[1])}}</span>
                    <span class="text-[12px] text-gray">UID: {{profile._id}}</span>
                  </div>
                </div>
                <hr>
                <button class="logout text-[16px]" @click="logout">
                  <i class="fa-solid fa-power-off mr-2"></i>
                  Log out
                </button>
              </div>
            </div>
          </div>
          <div class="cursor-pointe p-2">
            <img width="20" src="/theme.png" alt="theme-icon" @click="changeTheme">
          </div>
        </div>
      </div>
    </nav>
    <div v-if="data" class="flex items">
      <nuxt-link
        v-for="el in data" :key="el._id" class="card flex align-center cursor-pointer"  :to="`/pages/${el._id}`">
        <img
          width="60px" height="6px" class="rounded-[50%] img mr-[16px]" :src="baseUrl + el.photoUrl[0].url"
             alt="img">
        <div class="text flex flex-col">
          <span class="title text-[12px] font-medium">
            {{ el.title }}
          </span>
          <span class="text-[12px] font-medium text-gray">
            {{ el.maxPool }} {{ el.poolCurrency }}
          </span>
          <span class="text-[12px] font-medium text-gray">
            {{ el.startedAt }}
          </span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {baseUrl, telegram, twitter} from "assets/config";

export default {
  name: 'MyNav',
  data() {
    return {
      data: [],
      profile: {},
      baseUrl,
      telegram,
      twitter,
      isModalActive: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    changeTheme() {
      this.$emit('changeTheme')
    },
    async fetchData() {
      try {
        const res = await this.$axios.$get('/product')
        this.data = res
        const profile = await this.$axios.$get('/auth/1', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        })
        this.profile = profile
      } catch (e) {

      }
    },
    logout() {
      localStorage.removeItem('jwt')
      this.$router.push('/auth')
    }
  }
}
</script>

<style scoped>

.modal__bg {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.modal {
  position: absolute;
  border-radius: 15px;
  border: 2px solid var(--bgColor);
  background-color: var(--primary);
  right: 55px;
  padding: 20px;
  bottom: auto;
  top: 65px;
  -webkit-box-shadow: 0px 0px 15px 6px var(--bgColor);
  box-shadow: 0px 0px 15px 6px var(--bgColor);
}

.color-primary {
  margin-top: 5px;
  color: #babbbc;
}

.logout {
  border-radius: 10px;
  transition: background-color .3s ease-in-out;
}

hr {
  width: 100%;
  height: 1px;
  margin: 12px 3px;
  border-color: var(--grayTextColor);
}

.cursor-pointe {
  cursor: pointer;
}

.font-medium {
  font-weight: 500 !important;
}

.nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  background: var(--primary);
  color: var(--textColor);
}

.img {
  border: 4px solid var(--tabHover);
  height: 60px;
}

.items {
  margin-top: 85px;
  overflow-x: scroll;
}

.items::-webkit-scrollbar {
  height: 4px;
  width: 4px;
}

.items::-webkit-scrollbar-thumb {
  border-radius: 20px !important;
  background-color: #363636;
}

.items::-webkit-scrollbar-track {
  border-radius: 20px !important;
  background-color: var(--bgColor);
}

a {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
}

.card {
  padding: 16px;
  border-radius: 10px;
  background-color: var(--primary);
  height: 96px;
  min-width: 300px !important;
  width: 300px !important;
  margin: 0 2px 4px;
}

.text-gray {
  color: var(--grayTextColor);
}

.cursor-pointer {
  transition: background-color .3s ease-in-out;
}

.cursor-pointer:hover {
  background-color: var(--aqua);
}

</style>
