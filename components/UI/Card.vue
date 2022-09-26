<template>
  <div class="card py-3 px-4 cursor-pointer" @click="goToPage">
    <div class="flex justify-between items-start mt-[5px]">
      <div class="flex items-start">
        <img
          v-if="typeof data.photoUrl === 'string'"
          class="img m-2"
          :src="data.photoUrl" alt="Image">
        <img
          v-else
          class="img m-2"
          :src="`${baseUrl}${data.photoUrl[0].url}`"
          alt="Image"
        />
        <div class="flex flex-col py-1">
          <span class="font-medium text-[#fafafa] text-[20px] flex align-start">
            {{ data.title }}
            <i class="fa-solid mt-2 ml-2 fa-angle-up font-regular text-[#b9babb] text-[14px]"></i>
          </span>
          <span class="text-[12px] font-regular success-text" v-if="data.successPercentage">{{ data.successPercentage }}%</span>
          <span class="text-[12px] font-regular text-[#fafafa]">Starts at {{ data.startedAt }}</span>
          <span class="flex items-center">
          <span class="flex items-center text-[14px] ">
            <i class="fa-solid fa-lock mr-1"></i>
            <span class="mr-1">{{ data.lockedPercentage }}%</span>
          </span>

          <UIIcon
            class="mr-2 text-[12px]"
            icon="audit-icon.png"
            text="Audit"
            :color="data.type === 'Succes' ? 'red' : 'orange'"
          />
          <UIIcon
            class="mr-2 text-[12px] p-0" :style="{padding: '3px'}"
            icon="search.png" text="" :color="data.type === 'Succes' ? 'red' : 'blue'"/>
        </span>
        </div>
      </div>
      <DoughnutChart v-if="isLoaded" class="mt-3" :hover="false" :width="30" :height="30" :data="graphData" :options="false"/>
    </div>
    <div class="flex items-center justify-between my-2">
      <span class="text-[12px] color-gray">Duration {{ data.durationDays }} days</span>
      <span class="text-[12px] color-gray">Started At: {{ data.startedAt }}</span>
    </div>
    <div class="flex items-center mt-2">
      <div
        class="bg-primary green-col bg-white relative flex items-center justify-around text-[#fafafa]"
        :style="{ width: `${100 / (data.maxPool / data.poolValue)}%` }"
      >
        <div class="text-[#fafafa]" v-if="data.poolValue / data.maxPool >= 1">
          {{ data.poolValue }} / {{ data.maxPool }} {{ data.poolCurrency }}
        </div>
        <div class="mr-2 text-[#fafafa]" v-if="data.poolValue / data.maxPool >= 1">
          {{data.maxPool / 100}} {{data.poolCurrency}}
        </div>
      </div>
      <div
        :class="{'rounded-[15px]': data.poolValue === 0}"
        v-if="(data.maxPool / data.poolValue) > 1"
        class="bg-primary relative w-full flex items-center justify-between pl-4 bl-0">
        <div class="text-[#fafafa]">
          {{ data.poolValue }} / {{ data.maxPool }} {{ data.poolCurrency }}
        </div>
        <div class="mr-2 text-[#fafafa]">
          {{data.maxPool / 100}} {{data.poolCurrency}}
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center w-full justify between mt-2">
      <div class="w-50 flex items-center">
        <div
          class="bg-primary blue-col bg-white relative flex justify-center text-[#fafafa]"
          :style="{ width: `${100 / (data.maxUsers / data.totalUsers)}%` }"
        >
          <div class="text-[#fafafa]" v-if="data.totalUsers / data.maxUsers >= 1">
            {{ data.totalUsers }} / {{ data.maxUsers }}
          </div>
        </div>
        <div
          v-if="(data.maxUsers / data.totalUsers) > 1"
          class="bg-primary relative w-full flex items-center pl-4 bl-0 text-[#fafafa]">
          {{ data.totalUsers }} / {{ data.maxUsers }}
        </div>
        <div class="flex items-center text-[#b9babb] text-[12px]">
          <i class="fa-solid text-[#b9babb] fa-file mx-2 "></i>
          {{ data.whitelistedUsers }}/{{ data.totalWhitelist }}
        </div>
      </div>
      <div class="flex justify-end text-[12px] w-50 items-center">
        <div class="flex items-center text-[#fafafa]">
          <i class="fa-solid fa-message mx-2 text-[#fafafa]"></i>
          0
        </div>
        <div class="flex items-center text-[#fafafa]">
          <i class="fa-solid fa-user mx-2 text-[#fafafa]"></i>
          {{ data.badgesUser }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseUrl} from 'assets/config'
import DoughnutChart from '@/components/DoughnutChart.vue'

export default {
  name: 'UICard',
  components: {
    DoughnutChart
  },
  props: ['data'],
  data() {
    return {
      baseUrl,
      isLoaded: false,
      graphData: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoaded = true
      this.graphData = JSON.parse(this.data.graph[0]).map((e) => Number(e))
    }, 1000)
  },
  methods: {
    goToPage() {
      this.$router.push(`/pages/${this.data._id}`)
    },
  }
}
</script>

<style scoped>
.card {
  background: var(--primary);
  color: var(--textColor);
  height: 200px;
  margin-top: 5px;
  -webkit-box-shadow: 0px 2px 3px 1px rgba(0,0,0,0.71);
  box-shadow: 0px 2px 3px 1px rgba(0,0,0,0.71);
}

.card:hover {
  background: var(--aqua);
}

.success-text {
  color: #68d67c;
  font-weight: 400;
  font-size: 12px;
}

.img {
  border-radius: 50%;
  width: 66px;
  height: 66px;
}

.bg-primary:first-child {
  background: var(--textColor);
}

.bg-primary {
  height: 18px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 15px;
  background: var(--bgColor);
  color: #fafafa;
}

.green-col {
  background: #3DBE85 !important;
}

.blue-col {
  background: #5A97FE !important;
}

.bl-0 {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.color-gray {
  color: var(--grayTextColor);
}
.rounded-\[15px\] {
  border-radius: 15px !important;
}
</style>
