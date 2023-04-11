<template>
    <div class="bg-slate-200 pt-3 pb-6 px-4 rounded-t-xl text-center shadow-md">
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
</style>
