<template>
  <div class="absolute w-full h-full mx-auto flex flex-col">
    <slot />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #191a1a;
  overscroll-behavior-y: none;
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
