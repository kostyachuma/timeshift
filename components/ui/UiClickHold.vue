<template>
        <!-- @pointerleave="hold = false" -->
  <div
    @contextmenu.prevent
    @click="click"
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
          }, 800);
        } else {
          clearTimeout(this.holdTimeout);
        }
      },
    },
    methods: {
        click() {
            this.clickCallback();
        },
        clear() {
            // this.clickCallback = () => {};
            clearTimeout(this.holdTimeout);
        }
    }
  };
</script>
