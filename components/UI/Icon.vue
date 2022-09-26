<template>
  <div
    class="px-1 rounded-[35px] font-semibold flex items-center"
    :class="`bg-${color}-400`"
  >
    <img style="height: 15px" :src="`/${icon}`" alt="icon" />
    {{ text }}
  </div>
</template>

<script>
import { baseUrl } from 'assets/config'

export default {
  name: 'UIIcon',
  props: ['text', 'color', 'icon', 'red'],
  data() {
    return {
      baseUrl,
    }
  },
}
</script>

<style scoped>

.bg-red-4000 {
  background: #f44336 !important;
}

.items-center {
  padding: 2px 8px;
}

</style>
