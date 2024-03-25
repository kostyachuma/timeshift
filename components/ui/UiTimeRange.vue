<script setup>
  import { timeToMs, msToTime } from "@/helpers";

  const props = defineProps(["modelValue", "description"]);

  const emit = defineEmits(["update:modelValue"]);

  const time = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });
</script>

<template>
  <div
    class="bg-slate-200/80 backdrop-blur pt-3 pb-6 px-4 rounded-t-xl text-center shadow-md"
  >
    <div class="grid grid-cols-3 gap-4 mb-2">
      <!-- left -->
      <div class="col-span-1 flex justify-start">
        <slot name="left" />
      </div>

      <!-- center -->
      <div class="col-span-1 flex justify-center">
        <input v-model="time" type="time" class="time-input" />
      </div>

      <!-- right -->
      <div class="col-span-1 flex justify-end">
        <slot name="right" />
      </div>
    </div>

    <input
      :value="timeToMs(time)"
      type="range"
      min="0"
      max="86340000"
      step="60000"
      class="ui-time-range w-full my-2"
      @input="time = msToTime($event.target.value)"
    />

    <div class="text-base text-black text-center">
      {{ description.split("/").join(" / ") }}
    </div>
  </div>
</template>

<style scoped>
  .time-input {
    @apply outline-none text-3xl bg-transparent;
  }

  .time-input::-webkit-calendar-picker-indicator {
    @apply hidden;
  }

  .ui-time-range {
    @apply appearance-none w-full h-2 my-4 rounded;
  }

  .ui-time-range:focus {
    @apply outline-none;
  }

  .ui-time-range::-webkit-slider-runnable-track {
    @apply cursor-pointer w-full h-2;
  }

  .ui-time-range::-webkit-slider-thumb {
    @apply appearance-none cursor-pointer shadow bg-slate-500 w-8 h-8 rounded-full -mt-3;
  }

  /* moz */
  .ui-time-range::-moz-range-track {
    @apply cursor-pointer w-full h-2;
  }

  .ui-time-range::-moz-range-thumb {
    @apply cursor-pointer shadow bg-slate-500 w-8 h-8 rounded-full -mt-3;
  }
</style>
