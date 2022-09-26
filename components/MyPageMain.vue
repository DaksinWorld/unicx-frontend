<template>
  <div v-if="data.graph" class="main">
    <div v-if="data.type !== 'Succes'">
      <div v-if="data.photoUrl" class="mt-[20px] bg-gray-c">
        <div class="card p-0 my-1 py-2">
          <div class="container flex justify-center text-[16px] text-[#03a9f4]">
            Starts in {{ data.startedAt }}
          </div>
        </div>
        <div class="card c-border p-0">
          <div class="container flexing-col flex items-center">
            <img
              v-if="data.photoUrl" width="180px" height="180px" class="img mr-3"
              :src="baseUrl + data.photoUrl[0].url"/>
            <div class="flex w-full flex-col">
              <h1 class="text-[34px] mb-2 hover:text-green-400">{{ data.title }}</h1>
              <div class="flex justify-between">
                <div class="text-gray">Socials</div>
                <div class="text-gray">
                  <a class="mx-2" :href="data.telegram">
                    <i class="fa-brands fa-telegram text-gray"></i>
                  </a>
                  <a class="mx-2" :href="data.twitter">
                    <i class="fa-brands fa-twitter text-gray"></i>
                  </a>
                  <a class="mx-2" :href="data.site">
                    <i class="fa-solid fa-sitemap text-gray"></i>
                  </a>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="text-gray">Status</div>
                <div class="text-gray">
                  {{ data.status }}
                </div>
              </div>
              <div class="flex justify-between">
                <div class="text-gray">Soft Cap</div>
                <div class="text-gray">
                  {{ data.softCap }} {{ data.poolCurrency }}
                </div>
              </div>
              <div class="flex justify-between items-center">
                <div class="text-gray">Badges</div>
                <div class="flex items-center text-[12px]">
                  <div class="my-2 text-gray p-1 px-2 border rounded-[15px]">
                    <i class="fa-solid fa-lock text-gray"></i>
                    x{{ data.lockedPercentage }}%
                  </div>
                  <div class="mx-2 text-gray p-1 px-2 border rounded-[15px]">
                    <i class="fa-solid fa-user text-gray"></i>
                    x{{ data.badgesUser }}
                  </div>
                  <UIIcon
                    class="mr-2 text-[12px]"
                    icon="audit-icon.png"
                    text="Audit"
                    color="orange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card p-0 mt-1 c-border">
          <div class="container">
            <div class="flex card p-0">
              <div
                class="flex items-center mr-2 w-50">
                <div
                  class="bg-primary h-[30px] green-col bg-white relative"
                  :style="{width: `${100 / (data.maxPool / data.poolValue)}%`}"></div>
                <div
                  class="bg-primary h-[30px] text-[16px] font-medium relative w-full justify-center flex items-center bl-0">
                  {{ data.poolValue }} / {{ data.maxPool }} {{ data.poolCurrency }}
                </div>
              </div>
              <div class="flex flex-row items-center w-25 mr-2 justify between">
                <div class="w-full flex items-center">
                  <div
                    class="bg-primary h-[20px] blue-col bg-white relative"
                    :style="{width: `${100 / (data.maxUsers / data.totalUsers)}%`}"></div>
                  <div
                    class="bg-primary h-[20px] text-[12px] font-medium relative w-full justify-center flex items-center bl-0">
                    {{ data.totalUsers }} / {{ data.maxUsers }} reserved
                  </div>
                </div>
              </div>
              <div class="flex flex-row items-center w-25 mr-2 justify between">
                <div class="w-full flex items-center">
                  <div
                    class="bg-primary h-[20px] blue-col bg-white relative"
                    :style="{width: `${100 / (data.totalWhitelist / data.whitelistedUsers)}%`}"></div>
                  <div
                    class="bg-primary h-[20px] relative w-full text-[12px] font-medium flex justify-center items-center bl-0 text-[#fafafa]">
                    {{ data.whitelistedUsers }} / {{ data.totalWhitelist }} whitelist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container p-0">
        <div class="flex flexing-col">
          <div class="card w-100 md:w-full mt-2 c-border w-50 br-15 mr-3 h-full">
            <span v-if="lockedConstant" class="mt-2 font-medium mb-2 text-[12px] px-3">{{ lockedConstant }}</span>
            <DoughnutChart v-if="graphData.length > 1" :width="130" :height="130" :data="graphData"/>
            <span class="my-2 text-[12px] text-green-400 hover:bg-[#242E2A] p-1 px-3 rounded-xl">
              {{ texts.greenText }} <br>
            </span>
            <span class="py-3 px-3 text-[12px] gray-c">
              {{ texts.greenTextMain }} <br>
            </span>
          </div>
          <div class="flex w-100 w-50 mt-2 flex-col justify-between">
            <div class="tabs flex">
              <div class="w-full">
                <div class="w-full h-[50px] bg-green flex p-4">
                  <img class="mr-2" height="26px" width="26px"
                       src="https://app.unicrypt.network/img/verified.104943f7.svg" alt="verified">
                  <span class="mr-2 text-[16px] font-medium">
                    Audited
                  </span>
                  <span class="text-[16px] font-regular">
                    by Cyberscope
                  </span>
                </div>
                <div class="w-full flex">
                  <div
                    v-if="data.type === 'Live'"
                    :class="{'tab-active': currentTab === 'presale'}"
                    class="tab text-[14px] w-50 cursor-pointer"
                    @click="currentTab = 'presale'"
                  >
                    <h1>
                      PRESALE
                    </h1>
                  </div>
                  <div
                    :class="{'tab-active': currentTab === 'info', 'w-50': data.type === 'Live'}"
                    class="tab text-[14px] w-full cursor-pointer"
                    @click="currentTab = 'info'"
                  >
                    <h1>
                      INFO
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="card h-full pt-0 br-15 mt-0">
              <h2 class="font-medium text-[12px]" v-if="currentTab === 'info'">
                <span class="text-[12px] gray-c" v-if="data.type !== 'Success'">{{ data.text }}</span>
                <span v-else>
                  <div class="bar text-[16px]">
                    100% Complete
                  </div>
                  <span class="flex justify-between p-5">
                    <div>
                      <progress-circle
                        :diameter="80"
                        :circle-width="5"
                        :circle-color="`#505153`"
                        :start-color="`#63cc77`"
                        :stop-color="`#63cc77`"
                        :completed-steps="data.lockedPercentage"
                        total-steps="100">
                        <i class="fa-solid fa-lock text-[22px] text-[#63cc77]"></i>
                      </progress-circle>
                      <div class="flex flex-col text-center">
                       <span class="text-[20px] text-[#63cc77]">{{ data.lockedPercentage }}%</span>
                        <span class="text-gray">
                          Lock 6 month
                        </span>
                      </div>
                    </div>
                    <div>
                      <progress-circle
                        :diameter="80"
                        :circle-width="5"
                        :circle-color="`#505153`"
                        :start-color="`#63cc77`"
                        :stop-color="`#63cc77`"
                        :completed-steps="data.totalUsers"
                        total-steps="0">
                        <i class="fa-solid fa-lock text-[27px] text-[#63cc77]"></i>
                      </progress-circle>
                      <div class="flex flex-col text-center">
                       <span class="text-[20px] text-[#63cc77]">{{ data.totalUsers }}</span>
                        <span class="text-gray">
                          Participants
                        </span>
                      </div>
                    </div>
                    <div>
                      <progress-circle
                        :diameter="80"
                        :circle-width="5"
                        :circle-color="`#505153`"
                        :start-color="`#63cc77`"
                        :stop-color="`#63cc77`"
                        :completed-steps="JSON.parse(data.graph[0])[0] / JSON.parse(data.graph[0]).reduce((acc, prev) => +acc + +prev) * 100"
                        :total-steps="JSON.parse(data.graph[0]).reduce((acc, prev) => +acc + +prev)">
                        <i class="fa-solid fa-lock text-[27px] text-[#63cc77]"></i>
                      </progress-circle>
                      <div class="flex flex-col text-center">
                       <span class="text-[20px] text-[#63cc77]">{{ (JSON.parse(data.graph[0])[0] / JSON.parse(data.graph[0]).reduce((acc, prev) => +acc + +prev) * 100).toFixed(1) }} %</span>
                        <span class="text-gray">
                          Tokenomics
                        </span>
                      </div>
                    </div>
                  </span>
                </span>
              </h2>
              <div v-if="currentTab === 'presale'" class="text-center flex flex-col">
                <div class="flex flex-col items-center">
                  <input v-model="addressValue" class="form-contro" type="text" placeholder="Address">
                  <button class="confirm p-2 rounded-lg mt-3 min-w-[120px]" :disabled="addressValue.length < 8 || isConfirmed" @click="confirm">
                    {{ isConfirmed === false ? 'Confirm' : 'Confirmed' }}
                  </button>
                </div>
                <span class="my-4 text-left font-medium text-[12px]" v-if="data.liveText">
                  {{ data.liveText }}
                </span>
                <div class="flex flex-col items-center">
                  <div class="form-contro col-gray">
                    {{ address }}
                  </div>
                  <span v-if="success" class="text-green-400">{{ success }}</span>
                  <button class="text-[16px] confirm p-2 rounded-lg mt-3 min-w-[120px]" @click="copyToClipBoard">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isModalActive" class="modal">
        <div class="modal__content flex flex-col items-center">
          <span class="font-medium text-[14px] text-[#b9babb]">
            Your Address Confirmed
          </span>
          <button class="confirm p-2 rounded-lg mt-3" @click="confirm">
            Close
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container mt-100px flex flexing-col">
        <div class="w-50 w-100 mt-2 flex flex-col mar-2">
          <div class="card-header br-15 bb-0">
            <div>
              <i class="fa-solid fa-arrow-left"></i>
              <nuxt-link class="card-header__items" to="/">
                Back to presales
              </nuxt-link>
            </div>
          </div>
          <div class="card br-15 bt-0">
            <div class="card-info flex mb-3">
              <img
                v-if="data.photoUrl" width="60px" height="60px" class="mr-3 rounded-[50%]"
                :src="baseUrl + data.photoUrl[0].url"/>
              <div class="text">
                <h1 class="text-[20px] card-header__items">{{ data.title }}</h1>
                <div class="text-12px text-[#b9babb]">
                  <span class="text-12px card-header__items mr-2 text-[#b9babb]">
                    BscScan <i class="fa-solid fa-arrow-up text-12px text-[#b9babb]"></i>
                  </span>
                  <span class="text-12px card-header__items mr-2 text-[#b9babb]">
                    {{ data.tokenAddress.substr(0, 6) }}...
                    <i class="fa-solid fa-copy text-12px text-[#b9babb]"></i>
                  </span>
                  <span class="text-12px card-header__items mr-2 text-[#b9babb]">
                    Website <i class="fa-solid fa-arrow-up text-12px text-[#b9babb]"></i>
                  </span>
                </div>
              </div>
            </div>
            <DoughnutChart v-if="graphData.length > 1" :width="200" :height="200" :data="graphData"/>
          </div>
        </div>
        <div class="w-50 w-100 mt-2 card br-15 mal-2">
          {{ data.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl, texts} from "assets/config";
import {ProgressCircle} from 'vue-progress-circle'
import DoughnutChart from '@/components/DoughnutChart.vue'


export default {
  name: "MyPageMain",
  components: {
    DoughnutChart,
    ProgressCircle
  },
  data() {
    return {
      data: [],
      lockedConstant: '',
      baseUrl,
      address: '',
      success: '',
      isLoaded: false,
      account: '',
      isConfirmed: false,
      isModalActive: false,
      currentTab: 'presale',
      texts,
      addressValue: '',
      graphData: []
    }
  },
  async mounted() {
    await this.fetchData()
    this.graphData = JSON.parse(this.data.graph[0]).map((e) => +e)
    this.isLoaded = true
  },
  methods: {
    copyToClipBoard() {
      navigator.clipboard.writeText(this.address)
      this.success = 'ADDRESS WAS COPIED'

      setTimeout(() => {
        this.success = ''
      }, 3000)
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
    confirm() {
      this.isModalActive = !this.isModalActive
      this.isConfirmed = true
    }
  }
}
</script>

<style scoped>
.form-contro {
  background: var(--bgColor);
  width: 100%;
  padding: 6px 14px;
  border-radius: 15px;
}

.col-gray {
  color: var(--grayTextColor);
}

.text-green-400 {
  color: #68d67c;
}

.bg-green {
  background: rgba(104, 214, 124, 0.2);
  border-radius: 15px 15px 0 0;
}

.desc-text {
  font-weight: 500;
  font-size: 12px;
}

.card-header {
  font-size: 14px;
  font-weight: 600;
  background-color: var(--tabBg);
  padding: 15px 15px;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green);
  width: 100%;
  height: 20px;
  background-image: linear-gradient(135deg, hsla(0, 0%, 100%, .25) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .25) 0, hsla(0, 0%, 100%, .25) 75%, transparent 0, transparent);
  background-size: 40px 40px;
  background-repeat: repeat;
}

.card-header__items {
  padding: 5px 10px;
  border-radius: 5px;
  transition: all .3s ease-in-out;
}

.card-header__items:hover {
  background-color: var(--tabHover);
}

.bt-0 {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.bb-0 {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.gray-c {
  color: var(--grayTextColor);
}

.main {
  min-height: calc(100vh - 300px);
  padding-bottom: 20px;
}

.mt-100px {
  margin-top: 100px;
}

.c-border {
  border: 1px solid #363636;
}

.text-gray {
  color: var(--grayTextColor) !important;
}

.p-0 {
  padding: 0 !important;
}

.card {
  background: var(--primary);
  width: 100%;
  padding: 25px 15px;
}

.br-15 {
  border-radius: 15px;
}

.mar-2 {
  margin-right: 0.75rem;
}

.mal-2 {
  margin-left: 0.75rem;
}

.img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}

.bg-primary {
  border-radius: 15px;
  background: var(--bgColor);
}

.bg-primary:first-child {
  background: var(--textColor);
}

.confirm:disabled {
  color: var(--grayTextColor);
}

.confirm {
  color: #68d67c;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 500;
  border: 3px #363636 solid;
  border-radius: 25px;
}

.bg-primary {
  border-radius: 15px;
  background: var(--bgColor);
}

.bl-0 {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.green-col {
  background: #3DBE85 !important;
}

.blue-col {
  background: #5A97FE !important;
}

.copy-field {
  border: 1px solid var(--grayTextColor);
  border-radius: 5px;
  padding: 7px 12px;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
}

.modal__content {
  background: var(--primary);
  border-radius: 5px;
  padding: 20px;
}

.pt-0 {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.tab {
  background: var(--tabBg);
  padding: 15px 0;
  color: var(--grayTextColor);
  display: flex;
  justify-content: center;
  letter-spacing: .0892857143em;
}

.tab:first-child {
  border-top-left-radius: 15px;
}

.tab:last-child {
  border-top-right-radius: 15px;
}

.w-50 {
  width: 50%;
}

.w-25 {
  width: 25%;
}

.tab {
  transition: background-color .3s ease-in-out;
}

.tab-active {
  color: var(--textColor);
  border-bottom: 2px solid white;
}

.tab:hover {
  background: var(--tabHover);
}

.tabs {
  border-radius: 15px 15px 0 0;
}

@media (max-width: 1200px) {
  .flexing-col {
    flex-direction: column;
  }

  .w-100 {
    width: 100% !important;
  }

  .mar-2 {
    margin-right: 0;
  }

  .mal-2 {
    margin-left: 0;
  }

}

</style>
