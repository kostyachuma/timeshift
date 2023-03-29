<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    class="bg-slate-200 border-none h-12 rounded-xl px-4 shadow-md overflow-hidden"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="{ label, value } in options"
      :key="label"
      :value="value"
    >
      {{ label }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps([
  'modelValue',
  'options'
]);
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select::-ms-expand {
  display: none;
}
</style>
