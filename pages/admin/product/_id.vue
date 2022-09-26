<template>
  <div class="container flex justify-left">
    <form @submit.prevent="submit">
      <div class="mb-1 flex justify-left">
        <nuxt-link class="underlined" to="/admin">
          <i class="fa-solid fa-arrow-left"></i>
            Back
        </nuxt-link>
      </div>
      <label class="mb-[10px]" for="type">Section</label>
      <select required v-model="type" class="select w-full" id="type">
        <option v-for="t in typeValue" :key="t" :value="t">{{ t }}</option>
      </select>
      <div>
        <label>status example: Started, awaiting to start, etc.</label>
        <input required v-model="status" type="text" :placeholder="status"/>
      </div>
      <div>
        <label>softCap</label>
        <input required v-model="softCap" type="number" :placeholder="softCap"/>
      </div>
      <div>
        <label>title 1.Title</label>
        <input required v-model="title" type="text" :placeholder="title"/>
      </div>
      <div>
        <label>Started At</label>
        <input required v-model="startedAt" type="text" :placeholder="startedAt"/>
      </div>
      <div>
        <label>Locked Percentage</label>
        <input required
               v-model="lockedPercentage"
               type="number"
               :placeholder="lockedPercentage"
        />
      </div>
      <div>
        <label>Duration Days</label>
        <input required
               v-model="durationDays"
               type="number"
               :placeholder="durationDays"
        />
      </div>
      <div>
        <label>Max Pool (bar)</label>
        <input required
               v-model="maxPool"
               type="number"
               min="1"
               :placeholder="maxPool"
        />
      </div>
      <div>
        <label>Pool Currency (Bnb, usdt, etc.)</label>
        <input required v-model="poolCurrency" type="text" :placeholder="poolCurrency"/>
      </div>
      <div>
        <label>Pool Value, Example 100(Pool Value) / 300(Max Pool)</label>
        <input required v-model="poolValue" type="number" :placeholder="poolValue"/>
      </div>
      <div>
        <label>Max Users(bar)</label>
        <input required v-model="maxUsers" type="number" min="1" :placeholder="maxUsers"/>
      </div>
      <div>
        <label>Current Users, the same logic as pool</label>
        <input required v-model="totalUsers" type="number" :placeholder="totalUsers"/>
      </div>
      <div>
        <label>Twiiter link</label>
        <input required v-model="twitter" type="text" :placeholder="twitter"/>
      </div>
      <div>
        <label>Site link</label>
        <input required v-model="site" type="text" :placeholder="site"/>
      </div>
      <div>
        <label>Telegram link</label>
        <input required v-model="telegram" type="text" :placeholder="telegram"/>
      </div>
      <div>
        <label>Badged Users</label>
        <input required v-model="badgesUser" type="number" :placeholder="badgesUser"/>
      </div>
      <div>
        <label>Total Whitelist</label>
        <input required v-model="totalWhitelist" type="number" min="1" :placeholder="totalWhitelist"/>
      </div>
      <div>
        <label>Whitelisted Users, the same logic as pool, (bar)</label>
        <input required v-model="whitelistedUsers" type="number" :placeholder="whitelistedUsers"/>
      </div>
      <div>
        <label>Success Percentage (Success Percentage at Success section)</label>
        <input v-model="successPercentage" type="number" :placeholder="successPercentage"/>
      </div>
      <div>
        <label>Token Address</label>
        <input required v-model="tokenAddress" type="text" :placeholder="tokenAddress"/>
      </div>
      <div>
        <label>Text in Live Section</label>
        <input v-model="liveText" type="text" :placeholder="liveText"/>
      </div>
      <div>
        <label>Graph</label>
        <div>
          <label>Presale Value</label>
          <input required v-model="graph1" type="number" :placeholder="graph1"/>
          <label>Liquidity</label>
          <input required v-model="graph2" type="number" :placeholder="graph2"/>
          <label>Fees</label>
          <input required v-model="graph3" type="number" :placeholder="graph3"/>
          <label>Locked</label>
          <input required v-model="graph4" type="number" :placeholder="graph4"/>
          <label>Burnt</label>
          <input v-model="graph5" type="number" :placeholder="graph5"/>
          <label>Unlocked</label>
          <input required v-model="graph6" type="number" :placeholder="graph6"/>
        </div>
      </div>
      <div>
        <label>text (Info section)</label>
        <input required v-model="text" type="text" :placeholder="text"/>
      </div>
      <div>
        <label>Icon (Token Logo)</label>
        <input required class="pl-[25px]" type="file" @change="handleFile"/>
      </div>
      <div class="flex flex-col items-center">
        <span class="font-semibold underlined cursor-pointer" @click="$router.push(`/pages/${id}`)">
          Visit Token Page
        </span>
        <button class="p-3 bg-yellow-400 text-black rounded-xl mt-5" type="submit">Submit</button>
      </div>
    </form>
    <UICard class="fixed right-[80px]" :data="data">

    </UICard>
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
  name: 'PRoductId',
  data() {
    return {
      typeValue: ['Upcoming', 'Live', 'Success'],
      type: '',
      file: '',
      status: '',
      totalWhitelist: '',
      whitelistedUsers: '',
      softCap: '',
      title: '',
      startedAt: '',
      lockedPercentage: '',
      durationDays: '',
      maxPool: '',
      poolCurrency: '',
      poolValue: '',
      maxUsers: '',
      totalUsers: '',
      twitter: '',
      site: '',
      liveText: '',
      telegram: '',
      badgesUser: '',
      graph: '',
      graph1: '',
      graph2: '',
      graph3: '',
      graph4: '',
      graph5: '',
      graph6: '',
      text: '',
      id: '',
      tokenAddress: '',
      successPercentage: '',
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
    async fetchData() {
      try {
        await this.$axios.$get('/auth/isAdmin', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        })

        const res = await this.$axios.$get(
          '/product/find/' + this.$route.params.id
        )

        this.id = res._id

        const keys = Object.keys(res)
        const value = Object.values(res)
        for (const i in keys) {
          const key1 = keys[i]
          const value1 = value[i]
          this[key1] = value1
        }
        const graph = JSON.parse(res.graph[0])
        for (const k in graph) {
          const currGraph = `graph${+k + 1}`
          this[currGraph] = graph[k]
        }
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
    handleFile(e) {
      this.file = e.target.files[0]
    },
    async submit() {
      try {
        const formData = new FormData()

        this.graph = [
          this.graph1,
          this.graph2,
          this.graph3,
          this.graph4,
          this.graph5,
          this.graph6,
        ]

        formData.append('file', this.file)
        formData.append('title', this.title)
        formData.append('softCap', this.softCap)
        formData.append('poolValue', this.poolValue)
        formData.append('poolCurrency', this.poolCurrency)
        formData.append('text', this.text)
        formData.append('maxUsers', this.maxUsers)
        formData.append('maxPool', this.maxPool)
        formData.append('totalUsers', this.totalUsers)
        formData.append('telegram', this.telegram)
        formData.append('twitter', this.twitter)
        formData.append('site', this.site)
        formData.append('liveText', this.liveText)
        formData.append('status', this.status)
        formData.append('type', this.type)
        formData.append('graph', JSON.stringify(this.graph))
        formData.append('badgesUser', this.badgesUser)
        formData.append('durationDays', this.durationDays)
        formData.append('lockedPercentage', this.lockedPercentage)
        formData.append('startedAt', this.startedAt)
        formData.append('whitelistedUsers', this.whitelistedUsers)
        formData.append('totalWhitelist', this.totalWhitelist)
        formData.append('tokenAddress', this.tokenAddress)
        formData.append('successPercentage', this.successPercentage)

        await this.$axios.$patch('/product/' + this._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })

        this.isModalActive = true
        this.modalValue = {
          text: 'Successfully updated new token',
          status: 'primary',
        }

        setTimeout(() => {
          this.isModalActive = false
        }, 3000)

      } catch (e) {
        this.isModalActive = true
        this.modalValue = {
          text: e.response.data.message,
          status: 'danger',
        }
        setTimeout(() => {
          this.isModalActive = false
        }, 3000)
      }
    },
  },
  computed: {
    data() {
      let url = ''

      const graph = [
        this.graph1,
        this.graph2,
        this.graph3,
        this.graph4,
        this.graph5,
        this.graph6,
      ]

      if(this.file) {
        url = window.URL.createObjectURL(this.file)
      }

      return {
        photoUrl: url,
        graph: JSON.stringify(graph),
        title: this.title,
        softCap: this.softCap,
        poolValue: this.poolValue,
        poolCurrency: this.poolCurrency,
        text: this.text,
        maxUsers: this.maxUsers,
        maxPool: this.maxPool,
        totalUsers: this.totalUsers,
        telegram: this.telegram,
        twitter: this.twitter,
        site: this.site,
        status: this.status,
        type: this.type,
        badgesUser: this.badgesUser,
        durationDays: this.durationDays,
        lockedPercentage: this.lockedPercentage,
        startedAt: this.startedAt,
        totalWhitelist: this.totalWhitelist,
        liveText: this.liveText,
        successPercentage: this.successPercentage,
        whitelistedUsers: this.whitelistedUsers,
        tokenAddress: this.tokenAddress,
      }
    }
  }
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

.select {
  background: var(--primary);
  margin-bottom: 10px;
}

option {
  color: var(--textColor);
}

input {
  border-radius: 20px;
  margin-bottom: 15px;
  color: var(--grayTextColor);
  background: var(--primary);
  border: 0px solid var(--grayTextColor);
  padding: 10px 20px;
}

form {
  width: 50%;
}

* {
  color: var(--textColor);
}

form div {
  display: flex;
  flex-direction: column;
}
</style>
