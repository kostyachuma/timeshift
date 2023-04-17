<template>
    <div class="bg-slate-200/80 backdrop-blur pt-3 pb-6 px-4 rounded-t-xl text-center shadow-md">
        <input v-model="time" type="time" class="time-input" />
        <input
            :value="timeToMs(time)"
            type="range"
            min="0"
            max="86340000"
            step="60000"
            class="ui-time-range w-full my-2"
            @input="time = msToTime($event.target.value)"
        />
        <div class="text-base text-black text-center">{{ description.split('/').join(' / ') }}</div>
    </div>
</template>

<script setup>
import { timeToMs, msToTime } from '@/helpers'

const props = defineProps(['modelValue', 'description']);
const emit = defineEmits(['update:modelValue'])

const time = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style scoped>
.time-input {
    @apply text-3xl bg-transparent;
}

.time-input::-webkit-calendar-picker-indicator {
    display: none;
}

.ui-time-range {
  -webkit-appearance: none;

  @apply w-full my-4;
}
.ui-time-range:focus {
  outline: none;
}

.ui-time-range::-webkit-slider-runnable-track {
    @apply cursor-pointer w-full h-2;

  /* border-radius: 3px; */
  /* background: #3071a9; */
}
.ui-time-range::-webkit-slider-thumb {
  -webkit-appearance: none;

  @apply cursor-pointer shadow bg-slate-500 w-8 h-8 rounded-full -mt-3;
}
/* .ui-time-range:focus::-webkit-slider-runnable-track {
  background: #367ebd;
} */


/* moz */
.ui-time-range::-moz-range-track {
    @apply cursor-pointer w-full h-2;
  /* width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101; */
}
.ui-time-range::-moz-range-thumb {
    @apply cursor-pointer shadow bg-slate-500 w-8 h-8 rounded-full -mt-3;
  /* box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer; */
}

/* ms */
/* .ui-time-range::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
.ui-time-range::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.ui-time-range::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
.ui-time-range::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
.ui-time-range:focus::-ms-fill-lower {
  background: #3071a9;
}
.ui-time-range:focus::-ms-fill-upper {
  background: #367ebd;
} */
</style>
