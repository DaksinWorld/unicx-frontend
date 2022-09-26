<template>
  <main>
    <div class="container">
      <div class="tab-container flex flex-col first-section">
        <ul class="flex justify-center tabs">
          <li
            v-for="(tab, i) in tabs"
            :key="i"
            class="flex flex-col items-center min-w-[150px] cursor-pointer"
            :class="{ active: currentTab === tab }"
            @click="currentTab = tab; currentPage = 0"
          >
            <i v-if="tab === 'Upcoming'" class="fa-regular fa-clock text-[20px]"></i>
            <i v-if="tab === 'Live'" class="fa-regular fa-circle text-[20px]"></i>
            <i v-if="tab === 'Success'" class="fa-solid fa-check text-[20px]"></i>
            <i v-if="tab === 'Your Allocation'" class="fa-solid fa-xmark text-[20px]"></i>
            <span class="h-[20px] text-[14px]">
              {{ tab }}
            </span>
          </li>
        </ul>
      </div>
      <div v-if="currentTab !== 'Your Allocation'" class="flex tab-container mt-2 py-3 px-5 color-primary">
        {{data.length}} Pre Sales
      </div>
      <div class="flex flex-wrap bg-darker px-2 py-1">
        <div v-for="el in slicedData" :key="el._id" class="w-50">
          <MyCard class="rounded-lg" :data="el" />
        </div>
        <div v-if="currentTab === 'Your Allocation'" class="w-full mt-1 text-center" >
          <table class="w-full">
            <thead>
              <tr class="bg-[#232323] font-regular">
                <th class="p-2 border-r-2">
                  Token
                </th>
                <th class="p-2 border-r-2">
                  Date
                </th>
                <th class="p-2 border-r-2">
                  Percentage
                </th>
                <th class="p-2">
                  Profit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" class="min-h-[40px]" :key="item.name + item.date">
                <td class="border-x-2 border-y-2 h-[40px]">
                  {{item.name}}
                </td>
                <td class="border-2 h-[40px]">
                  {{item.date}}
                </td>
                <td class="border-2 h-[40px]">
                  {{item.percentage}}
                </td>
                <td class="border-x-2 border-y-2 h-[40px]">
                  {{item.profit}}
                </td>
              </tr>
            </tbody>
          </table>
          <button :disabled="items.length === 0"
                  @click="claim"
                  class="border rounded-[35px] min-w-[190px] px-5 py-2 my-[20px] claim disabled:cursor-not-allowed">
            <span class="font-bold">+</span>
            Claim Your USDT
          </button>
        </div>
      </div>
      <div v-if="currentTab !== 'Your Allocation'" class="pagination font-[12px] font-medium">
        <button
          class="disabled:text-[#4E5153]"
          :disabled="currentPage === 0"
          @click="currentPage -= 1"
        >
          <i class="fa-solid fa-backward" :class="{'text-[#4E5153]': currentPage === 0}"></i>
          Previous
        </button>
        <h1 class="mx-3">{{ currentPage + 1 }}/{{ Math.ceil(data.length / 6) }}</h1>
        <button
          class="disabled:text-[#4E5153]"
          :disabled="currentPage === Math.ceil(data.length / 6) - 1"
          @click="currentPage += 1"
        >
          Next
          <i class="fa-solid fa-forward"  :class="{'text-[#4E5153]': currentPage === Math.ceil(data.length / 6) - 1}"></i>
        </button>
      </div>
    </div>
    <div class="modal" v-if="isModalActive" @click="close">
      <div v-if="isLoading">
      <UISpinner/>
    </div>
      <div v-else class="modal__content" @click.stop>
        <span class="font-medium text-[14px] text-[#b9babb]">
          Congratulation! We sent USDT To Your Wallet
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import MyCard from '~/components/UI/Card'

export default {
  name: 'MyMain',
  components: {
    MyCard,
  },
  data() {
    return {
      data: [],
      isLoading: false,
      isModalActive: false,
      items: [

      ],
      searchValue: '',
      tabs: ['Upcoming', 'Live', 'Success', 'Your Allocation'],
      currentTab: 'Live',
      currentPage: 0,
    }
  },
  computed: {
    slicedData() {
      const curr = this.currentPage === 0 ? 0 : this.currentPage * 6
      return this.data.slice(curr, curr + 6).filter((e) => {
        if (this.searchValue) {
          return e.title.toLowerCase().includes(this.searchValue.toLowerCase())
        }
        return e
      })
    },
  },
  watch: {
    currentTab() {
      this.fetchData()
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await this.$axios.$post('/product/findByCategory', {
        type: this.currentTab,
      })
      this.data = res
    },
    claim() {
      this.isModalActive = true
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000 * 10)
    },
    close() {
      if(this.isLoading !== true) {
        this.isModalActive = false
        this.items = []
      }
    }
  },
}
</script>

<style scoped>
main {
  min-height: calc(100vh - 300px);
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  background: var(--primary);
  border-radius: 5px;
  padding: 20px;
}

.claim {
  border: none;
  background-color: #68d67c;
  width: 170px;
}

.claim:disabled {
  background: var(--grayTextColor);
}

td, th {
  border-color: #363636;
}

.w-50 {
  margin: 2px 4px;
  width: calc(50% - 4px);
}

.w-50:nth-child(2n + 1) {
  margin-left: 0;
}

.w-50:nth-child(2n) {
  margin-right: 0;
}

.pagination {
  margin-top: 5px;
  background: var(--primary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

@media (max-width: 1200px) {
  .w-50 {
    width: 100%;
  }
}

.tabs li {
  padding: 20px;
  transition: all 0.3s ease-in-out;
}

.tab-container {
  background: var(--primary);
  color: var(--textColor);
  width: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
}

li span {
  color: var(--grayTextColor);
}

li i {
  color: var(--grayTextColor);
}

.tabs li:hover {
  background: #292A2D;
  color: var(--textColor);
}

.active span {
  color: var(--light-aqua) !important;
}

.active i {
  color: var(--light-aqua) !important;
}

.active:hover {
  background: #143847 !important;
  color: var(--textColor);
}

.first-section {
  border-radius: 20px 20px 0 0;
  padding-top: 16px;
  padding-left: 32px;
  padding-right: 32px;
}

.color-primary {
  color: var(--grayTextColor);
  font-size: 16px;
  font-weight: 400;
}

.bg-darker {
  background: var(--underCardColor);
}

</style>
