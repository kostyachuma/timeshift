<template>
        <!-- @pointerleave="hold = false" -->
  <div
    @contextmenu.prevent
    @pointerdown="hold = true"
    @pointerup="hold = false"
    @pointermove="clear"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    name: "UiClickHold",
    data() {
      return {
        hold: false,
        holdTimeout: null,
        clickCallback: null,
      };
    },
    watch: {
      hold(value) {
        if (value) {
          this.clickCallback = () => {
            this.$emit("is-click");
          };

          this.holdTimeout = setTimeout(() => {
            this.$emit("is-hold");
            this.clickCallback = () => {};
            clearTimeout(this.holdTimeout);
          }, 1000);
        } else {
          this.clickCallback();
          clearTimeout(this.holdTimeout);
        }
      },
    },
    methods: {
        clear() {
            this.clickCallback = () => {};
            clearTimeout(this.holdTimeout);
        }
    }
  };
</script>
