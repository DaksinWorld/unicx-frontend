<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    options: {
      type: Boolean,
      default: true
    },
    chartId: {
      type: String,
      default: 'doughnut-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    hover: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      chartData: {
        labels: [
          'Presale',
          'Liquidity',
          'Feess',
          'Locked',
          'Burnt',
          'Unlocked',
        ],
        datasets: [
          {
            backgroundColor: [
              '#9e52c5',
              '#0496c9',
              '#13b6aa',
              '#0edc7f',
              '#d4be5c',
              '#141719',
            ],
            data: this.data,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: this.options,
            align: 'start',
            position: 'right'
          }
        },
        events: this.hover ? ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"] : ['click']
      }
    }
  }
}
</script>
