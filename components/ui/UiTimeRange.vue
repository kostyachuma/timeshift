<template>
    <div class="bg-sky-50 px-4 py-4 rounded-xl text-center">
        <input v-model="time" type="time" class="text-3xl bg-transparent mb-6" />
        <input :value="timeToMs(time)" type="range" min="0" max="86340000" step="60000" class="ui-time-range w-full"
            @input="time = msToTime($event.target.value)" />
    </div>
</template>

<script setup>
import { timeToMs, msToTime } from '@/helpers'

const props = defineProps(['modelValue']);
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
