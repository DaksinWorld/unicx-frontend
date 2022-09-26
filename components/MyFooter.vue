<template>
  <footer>
<!--    <div class="el-hover-bg-rounded">
      <a :href="twitter">
        <i class="fa-brands fa-twitter text-[#b9babb] text-[26px]"></i>
      </a>
    </div>
    <div class="el-hover-bg-rounded">
      <a :href="telegram">
        <img width="26" height="26" src="/telegram.png" alt="telegram">
      </a>
    </div>-->
    <nuxt-link to="/terms" :class="{'el-hover-bg': $route.path === '/terms'}" class="hover-el cursor-pointer font-medium text-[#b9babb] text-[14px]">
      Terms and Conditions
    </nuxt-link>
    <nuxt-link to="/terms/privacy-policy"
               :class="{'el-hover-bg': $route.path === '/terms/privacy-policy'}"
               class="hover-el cursor-pointer font-medium text-[#b9babb] text-[14px]">
      Privacy Policy
    </nuxt-link>
  </footer>
</template>

<script>
import {telegram, twitter} from "assets/config";

export default {
  name: "MyFooter",
  data() {
    return {
      telegram,
      twitter,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        await this.$axios.$get('/constants')
      } catch (e) {

      }
    }
  }
}
</script>

<style scoped>
footer {
  background: var(--primary);
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-hover-bg-rounded {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
}

.el-hover-bg {
  background: #333538;
}

.el-hover-bg-rounded:hover {
  padding: 12px 14px;
}

.hover-el {
  border-radius: 25px;
}

</style>
