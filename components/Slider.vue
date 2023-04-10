<template>
  <div class="flex overflow-auto scrollbar-hide">
    <div
      v-for="{ color, name, time } of zonesList"
      :key="name"
      class="slider-container grow first:pl-4 last:pr-4 first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl"
    >
      <div :style="`background-color: ${color};`" class="slider-item p-4">
        <div class="whitespace-nowrap text-center text-sm">{{ name }}</div>
        <div class="whitespace-nowrap text-center text-lg font-bold tabular-nums">
          {{ time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    zonesList: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.slider-container:first-child .slider-item {
  @apply rounded-tl-xl rounded-bl-xl;
}

.slider-container:last-child .slider-item {
  @apply rounded-tr-xl rounded-br-xl;
}
</style>
