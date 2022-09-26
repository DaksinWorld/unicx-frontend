<template>
  <div class="container flex justify-left">
    <form @submit.prevent="submit">
      <div class="mb-1 flex justify-left">
        <nuxt-link class="underlined" to="/admin">
          <i class="fa-solid fa-arrow-left"></i>
          Back
        </nuxt-link>
      </div>
      <label for="type">Section</label>
      <select required v-model="type" class="select w-full" id="type">
        <option v-for="t in typeValue" :key="t" :value="t">{{ t }}</option>
      </select>
      <div>
        <label>Status, example: Started, awaiting to start, etc.</label>
        <input required v-model="status" type="text" :placeholder="status"/>
      </div>
      <div>
        <label>Soft Cap</label>
        <input required v-model="softCap" type="number" :placeholder="softCap"/>
      </div>
      <div>
        <label>Title</label>
        <input required v-model="title" type="text" :placeholder="title"/>
      </div>
      <div>
        <label>Started At (Date)</label>
        <input required v-model="startedAt" type="text" :placeholder="startedAt"/>
      </div>
      <div>
        <label>Locked Percentage (%)</label>
        <input required
          v-model="lockedPercentage"
          type="number"
          :placeholder="lockedPercentage"
        />
      </div>
      <div>
        <label>Duration Days (days)</label>
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
          :placeholder="maxPool"
        />
      </div>
      <div>
        <label>Pool Currency (Bnb, usdt, ...)</label>
        <input required v-model="poolCurrency" type="text" :placeholder="poolCurrency"/>
      </div>
      <div>
        <label>Pool Value, Example: 100(Pool Value) / 300(Max Pool)</label>
        <input required v-model="poolValue" type="number" :placeholder="poolValue"/>
      </div>
      <div>
        <label>Max Users (bar)</label>
        <input required v-model="maxUsers" type="number" :placeholder="maxUsers"/>
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
        <input required v-model="totalWhitelist" type="number" :placeholder="totalWhitelist"/>
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
        <label class="font-bold text-xl">Graph</label>
        <div class="ml-3">
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
        <label>Text (Info section)</label>
        <input required v-model="text" type="text" :placeholder="text"/>
      </div>
      <div>
        <label>Icon (Token Logo)</label>
        <input required class="pl-[25px]" type="file" @change="handleFile"/>
      </div>
      <button class="p-3 bg-yellow-400 text-black rounded-xl mt-5" type="submit">Submit</button>
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
  name: 'ProductID',
  data() {
    return {
      typeValue: ['Upcoming', 'Live', 'Success'],
      type: '',
      file: '',
      status: '',
      softCap: '',
      title: '',
      startedAt: '',
      lockedPercentage: '',
      durationDays: '',
      maxPool: 0,
      poolCurrency: '',
      poolValue: 0,
      maxUsers: '',
      totalUsers: '',
      twitter: '',
      site: '',
      telegram: '',
      badgesUser: '',
      whitelistedUsers: '',
      totalWhitelist: '',
      graph: '',
      graph1: '',
      graph2: '',
      graph3: '',
      graph4: '',
      graph5: '',
      graph6: '',
      text: '',
      liveText: '',
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
        formData.append('status', this.status)
        formData.append('type', this.type)
        formData.append('graph', JSON.stringify(this.graph))
        formData.append('badgesUser', this.badgesUser)
        formData.append('durationDays', this.durationDays)
        formData.append('lockedPercentage', this.lockedPercentage)
        formData.append('startedAt', this.startedAt)
        formData.append('totalWhitelist', this.totalWhitelist)
        formData.append('liveText', this.liveText)
        formData.append('successPercentage', this.successPercentage)
        formData.append('whitelistedUsers', this.whitelistedUsers)
        formData.append('tokenAddress', this.tokenAddress)

        await this.$axios.$post('/product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        this.isModalActive = true
        this.modalValue = {
          text: 'Successfully created new token',
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
    async fetchData() {
      try {
        await this.$axios.$get('/auth/isAdmin', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
          }
        })
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
    }
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
  padding: 10px 5px;
}

form {
  width: 50%;
}

form div {
  display: flex;
  flex-direction: column;
}

* {
  color: var(--textColor);
}

</style>
