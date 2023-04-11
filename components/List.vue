<template>
  <draggable
    :modelValue="modelValue"
    :disabled="!draggable"
    group="transition-group"
    item-key="name"
    class="flex flex-col gap-2 relative"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #item="{ element: { color, name, time } }">
      <div class="flex items-center gap-2 sticky top-0">
        <bars-icon
          v-if="editing"
          class="shrink-0 w-6 h-6 fill-current text-white"
        />

        <div
          :style="`background-color: ${color}`"
          class="flex grow p-4 gap-4 rounded-xl min-w-0 cursor-pointer drop-shadow"
          @click="collapse"
          @contextmenu.prevent="edit"
        >
          <div class="truncate flex-1 text-base text-black">{{ name }}</div>
          <div class="whitespace-nowrap font-bold text-xl text-black tabular-nums">
            {{ time }}
          </div>
        </div>

        <button
          v-if="editing"
          class="shrink-0 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
          @click="removeTimezone(name)"
        >
          <remove-icon class="w-6 h-6 fill-current text-white" />
        </button>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import RemoveIcon from '@/assets/icons/remove.svg?component';
import BarsIcon from '@/assets/icons/bars.svg?component';

export default {
  name: 'List',
  components: {
    draggable,
    RemoveIcon,
    BarsIcon,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    editing: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      move: false,
    }
  },
  computed: {
    draggable () {
      return this.editing // && this.move;
    }
  },
  watch: {
    move(value) {
      console.log(value);
    }
  },
  methods: {
    edit () {
      this.$emit('edit');
    },
    collapse() {
      this.$emit('collapse');
    },
    removeTimezone(name) {
      this.$emit('remove-timezone', name);
    },
  }
};
</script>
