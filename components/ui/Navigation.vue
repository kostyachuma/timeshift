<template>
  <nav class="">
    <ul class="flex">
      <li v-for="{ name, link } of navigation" class="grow">
        <nuxt-link :to="link" class="">
            {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const navigation = ref([
    { name: 'Map', link: '/map' },
    { name: 'Cities', link: '/cities' },
    { name: 'Planer', link: '/planer' }
])
</script>
