<template>
  <div>
    <MyNav/>
    <div class="container pt-[100px]">
      <h1 class="font-semibold text-[26px]">Admin Panel</h1>
      <div class="flex justify-between items-center mb-4">
        <div class="flex">
          <nuxt-link class="mr-2" to="/admin/constants">
            <button
              class="btn my-2 bg-yellow-500 rounded-xl p-3 text-white font-semibold text-sm"
            >
              Constants
            </button>
          </nuxt-link>
          <nuxt-link class="mr-2" to="/admin/product">
            <button
              class="btn my-2 bg-yellow-500 rounded-xl p-3 text-white font-semibold text-sm"
            >
              Create New Token
            </button>
          </nuxt-link>
          <a class="mr-2" href="/admin/docs">
            <button
              class="btn my-2 bg-yellow-500 rounded-xl p-3 text-white font-semibold text-sm"
            >
              Docs
            </button>
          </a>
        </div>
        <div>
          <input v-model="searchValue" type="text" class="input p-2" placeholder="Search...">
        </div>
        <div class="flex items-center">
          <span class="mr-2">
            Sort By: {{sortValue}}
          </span>
          <select class="select" v-model="sortValue">
            <option value="title">
              Sort By Title Name
            </option>
            <option value="text">
              Sort By Text
            </option>
            <option value="type">
              Sort By Type
            </option>
          </select>
        </div>
      </div>
      <table v-if="searched.length > 0" class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-800 text-gray-400">
          <tr>
            <th class="py-3 px-6">Image</th>
            <th class="py-3 px-6">Title</th>
            <th class="py-3 px-6">Text</th>
            <th class="py-3 px-6">Type</th>
            <th class="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in searched"
            :key="el._id"
            class="border-b bg-gray-900 border-gray-700"
          >
            <th class="py-4 px-6 font-medium whitespace-nowrap text-white">
              <img class="img" :src="baseUrl + el.photoUrl[0].url" alt=""/>
            </th>
            <th class="py-4 px-6 text-white">
              {{ el.title }}
            </th>
            <th class="py-4 px-6 text-white">
              <span>
                {{ (el.text).substr(0, 50) }}
              </span>
            </th>
            <th
              :class="{
              'text-yellow-300': el.type === 'Upcoming',
              'text-blue-300': el.type === 'Live',
              'text-green-300': el.type === 'Success'
            }"
              class="py-4 px-6">
              {{ el.type }}
            </th>
            <th class="py-4 px-6">
              <button
                class="bg-red-400 rounded-xl p-3 text-white mr-2"
                @click="handleDelete(el._id)"
              >
                Delete
              </button>
              <button
                class="bg-yellow-400 rounded-xl p-3 text-white ml-2"
              >
                <nuxt-link :to="`/admin/product/${el._id}`">
                  Change
                </nuxt-link>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
      <div class="text-center font-bold text-[30px] flex flex-col items-center" v-else>
        There are no tokens
        <nuxt-link to="/admin/product">
          <button
            class="btn my-2 bg-green-400 rounded-xl p-3 text-white font-semibold text-sm"
          >
            Click here to create new token
          </button>
        </nuxt-link>
      </div>
    </div>
    <div v-if="isModalActive" class="modal">
      <span
        :class="{'text-red-500': modalValue.status === 'danger',
         'text-yellow-600': modalValue.status === 'warning',
         'text-green-500': modalValue.status === 'primary'}"
      >
        {{modalValue.text}}
      </span>
    </div>
  </div>
</template>

<script>
import MyNav from '~/components/Nav'
import {baseUrl} from '~/assets/config'

export default {
  name: 'AdminPanel',
  components: {
    MyNav,
  },
  data() {
    return {
      data: [],
      baseUrl,
      searchValue: '',
      sortValue: '',
      isModalActive: false,
      modalValue: {
        text: '',
        status: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async handleDelete(id) {
      try {
        await this.$axios.$delete('/product/' + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        })
        this.fetchData()
        this.isModalActive = true
        this.modalValue = {
          status: "primary",
          text: 'Successfully deleted token'
        }
        setTimeout(() => {
          this.isModalActive = false
        }, 3000)
      } catch (e) {
        this.isModalActive = true
        this.modalValue = {
          status: "danger",
          text: e.response.data.message
        }
        setTimeout(() => {
          this.isModalActive = false
        }, 3000)
      }
    },
    async fetchData() {
      try {
        await this.$axios.$post(
          '/auth/isAdmin',
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        )
        const res = await this.$axios.$get('/product')
        this.data = res
      } catch (e) {
        if(e.response.data.statusCode === 401) {
          this.$router.push('/auth')
        }
      }
    },
  },
  computed: {
    searched() {
      return this.data.filter((e) => {
        if (this.searchValue) {
          return e.text.toLowerCase().includes(this.searchValue.toLowerCase())
        }
        return e
      })
        .sort((a,b) => {
        if(this.sortValue) {
          return b[this.sortValue].localeCompare(a[this.sortValue])
        }
        return 0
      })
    }
  }
}
</script>
<style>
.modal {
  position: fixed;
  bottom: 40px;
  right: 60px;
  background: var(--primary);
  padding: 20px;
  border-radius: 20px;
}

* {
  color: var(--textColor);
}

.select {
  background: var(--primary);
}

.img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
