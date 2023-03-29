<template>
  <div class="flex items-center px-4 gap-2 bg-slate-200 h-12 grow rounded-xl shadow-md shrink-0">
    <slot name="left" />
    <input
      v-bind="attrs"
      :value="modelValue"
      type="text"
      class="border-none grow bg-transparent outline-none"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot name="right" />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    modelValue: {
      type: String,
      required: false,
    },
  },
  computed: {
    attrs () {
      return _.omit(this.$attrs, ['class'])
    }
  },
  methods: {
    focus () {
      this.$el.querySelector('input').focus()
    }
  }
}
</script>
