<template>
  <div class="container pt-5 flex flex-col">
    <div class="mb-1 flex justify-left">
      <nuxt-link class="underlined" to="/admin">
        <i class="fa-solid fa-arrow-left"></i>
        Back
      </nuxt-link>
    </div>
    <div v-if="constants[0]">
      <h1 v-if="constants[0]">{{ constants[0].name }}</h1>
      <div
        class="cursor-pointer"
        v-if="pickedConstant !== 'locked' && constants[0]"
        @click="pick(constants[0])"
      >
        {{ constants[0].text }}
      </div>
      <div v-else>
        <textarea
          v-model="locked"
          class="bg-black border-2"
          :placeholder="constants[0].text"
        />
        <button
          class="mx-2 p-3 rounded bg-gray-500 text-black"
          @click="submit(constants[0])"
        >
          Submit
        </button>
      </div>
      <hr class="my-2" />
    </div>
    <div v-if="constants[1]">
      <h1>{{ constants[1].name }}</h1>
      <div class="cursor-pointer" v-if="pickedConstant !== 'address'" @click="pick(constants[1])">
        {{ constants[1].text }}
      </div>
      <div v-else>
        <textarea
          v-model="address"
          class="bg-black border-2"
          :placeholder="constants[1].text"
        />
        <button
          class="mx-2 p-3 rounded bg-gray-500 text-black"
          @click="submit(constants[1])"
        >
          Submit
        </button>
      </div>
      <hr class="my-2" />
    </div>
    <div v-if="constants[2]">
      <h1>{{ constants[2].name }}</h1>
      <div class="cursor-pointer" v-if="pickedConstant !== constants[2].name" @click="pick(constants[2])">
        {{ (constants[2].text).substr(0, 200) }}...
      </div>
      <div v-else>
        <textarea
          v-model="terms"
          class="bg-black border-2"
          :placeholder="constants[2].text"
        />
        <button
          class="mx-2 p-3 rounded bg-gray-500 text-black"
          @click="submit(constants[2])"
        >
          Submit
        </button>
      </div>
      <hr class="my-2" />
    </div>
    <div v-if="constants[3]">

      <h1>{{ constants[3].name }}</h1>
      <div class="cursor-pointer" v-if="pickedConstant !== constants[3].name" @click="pick(constants[3])">
        {{ (constants[3].text).substr(0, 200) }}...
      </div>
      <div v-else>
        <textarea
          v-model="privacy"
          class="bg-black border-2"
          :placeholder="constants[3].text"
        />
        <button
          class="mx-2 p-3 rounded bg-gray-500 text-black"
          @click="submit(constants[3])"
        >
          Submit
        </button>
      </div>
      <hr class="my-2" />
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
export default {
  name: 'ConstantsPage',
  data() {
    return {
      constants: [],
      text: '',
      pickedConstant: '',
      locked: '',
      address: '',
      terms: '',
      privacy: '',
      isModalActive: '',
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
    pick(text) {
      this.pickedConstant = text.name
      this.locked = text.text
      this.address = text.text
      this.terms = text.text
      this.privacy = text.text
    },
    async submit(el) {
      try {
        await this.$axios.$patch(
          '/constants/' + el._id,
          {
            text: this[el.name],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
          }
        )
        this.pickedConstant = ''
        this.fetchData()

        this.isModalActive = true
        this.modalValue = {
          status: "danger",
          text: 'Successfully changed constant ' + el.name
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
        await this.$axios.$get('/auth/isAdmin', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        })
        const res = await this.$axios.$get('/constants/')
        this.constants = res
      } catch (e) {
        if(
          e.response.data.statusCode === 401
        ) {
          this.isModalActive = true
          this.modalValue = {
            status: "danger",
            text: e.response.data.message
          }
          setTimeout(() => {
            this.isModalActive = false
            this.$router.push('/auth')
          }, 3000)
        }
      }
    },
  },
}
</script>

<style scoped>

.modal {
  position: fixed;
  bottom: 40px;
  right: 60px;
  background: var(--primary);
  padding: 20px;
  border-radius: 20px;
}

textarea {
  width: 50%;
}

* {
  color: var(--textColor);
}

</style>
