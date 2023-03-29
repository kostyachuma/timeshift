<template>
  <div
    :class="[
      show ? 'translate-x-0' : '-translate-x-full',
    ]"
    class="absolute top-0 left-0 w-full h-full bg-slate-800 z-30 py-6 px-8 flex flex-col transition-all duration-300 ease-in-out transform"
  >
    <div class="flex gap-2">
      <ui-input
        ref="input"
        v-model="searchQuery"
        placeholder="Search"
        class="mb-4"
      >
        <template #left>
          <search-icon class="w-6 h-6 fill-current text-black" />
        </template>
      </ui-input>
      <button
        class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
        @click="$emit('close')"
      >
        <close-icon class="w-8 h-8 fill-current text-black" />
      </button>
    </div>
<!-- 
    <div class="flex gap-2 mb-4">
      <button class="grow bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-base text-black">{{ 'Add new' }}</button>
      <button class="grow bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-base text-black">{{ 'All' }}</button>
      <button class="grow bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-base text-black">{{ 'My' }}</button>
      <button class="grow bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-base text-black">{{ 'Countries' }}</button>
      <button class="grow bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-xl text-base text-black">{{ 'Cityes' }}</button>
    </div> -->

    <!-- list -->
    <div class="flex flex-col gap-2 grow overflow-auto">
      <div
        v-for="option of filteredOptions"
        :key="option.label"
        class="cursor-pointer flex items-center p-4 rounded text-base mr-auto bg-slate-200 hover:bg-slate-300 w-full"
        @click="selectOption(option)"
      >
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CloseIcon from "@/assets/icons/close.svg?component";
  import SearchIcon from "@/assets/icons/search.svg?component";

  export default {
    components: {
      CloseIcon,
      SearchIcon,
    },
    props: {
      show: {
        type: Boolean,
        required: false,
      },
      options: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        searchQuery: '',
      }
    },
    computed: {
      filteredOptions () {
        return this.options.filter(
          ({ label }) => label.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    watch: {
      show: {
        immediate: true,
        handler (value) {
          if (value) {
            this.searchQuery = '';

            this.$nextTick(() => {
              this.$refs.input.focus();
            });
          }
        },
      },
    },
    methods: {
      selectOption (value) {
        this.$emit('update:modelValue', value);
        this.$emit('close');
      },
    }
  };
</script>
