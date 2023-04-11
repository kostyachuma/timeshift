<template>
  <div class="absolute w-full h-full mx-auto flex flex-col">
    <slot />
  </div>
</template>

<script setup>
import { getAnalytics } from "firebase/analytics";

getAnalytics();

const app = useApp();

app.fetchPlatform();
</script>

<style>
html,
body {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #191a1a;
  user-select: none;
  overscroll-behavior-y: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
}

/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
