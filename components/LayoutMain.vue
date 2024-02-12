<template>
  <div class="absolute top-0 right-0 bottom-0 left-0 flex">
    <aside class="relative flex flex-col w-full lg:max-w-lg lg:bg-slate-800">
      <slot name="menu" />

      <div
        :class="{
          'pt-16': app.isIOS,
          'pt-6': app.isAndroid,
          'pt-6': app.isWeb
        }"
        class="pb-6 px-4 lg:px-8"
      >
        <div class="relative z-10">
          <slot name="head" />
        </div>
      </div>

      <div v-if="isList" class="relative z-10 grow px-4 lg:px-8 pb-6 overflow-auto scrollbar-hide">
        <slot name="list" />
      </div>

      <div class="mt-auto">
        <div class="relative z-10">
          <div v-if="!isList" class="mb-3">
            <slot name="slider" />
          </div>
          <slot name="range" />
        </div>
      </div>

      <!-- <ui-navigation /> -->
    </aside>

    <main class="z-0 absolute w-full h-full lg:relative">
      <slot name="main" />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutMain',
  props: {
    isList: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const app = useApp();

    app.fetchPlatform();

    return { app };
  }
}
</script>
