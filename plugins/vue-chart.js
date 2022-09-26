import { Doughnut } from 'vue-chartjs'

export default {
  name: 'my-doughnut',
  extends: Doughnut,
  props: {
    data: { type: Object, default: null },
    options: { type: Object, default: null },
  },
  watch: {
    data() {
      this.update()
    },
    options() {
      this.update()
    },
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.renderChart(this.data, this.options)
    },
  },
}
