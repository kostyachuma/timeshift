<script setup>
import MapIcon from '@/assets/icons/map.svg?component';
import CityIcon from '@/assets/icons/city.svg?component';

const navigation = [
    {
      icon: MapIcon,
      name: 'Map',
      link: '/'
    },
    {
      icon: CityIcon,
      name: 'Cities',
      link: '/cities'
    },
    {
      icon: MapIcon,
      name: 'Planner',
      link: '/planner'
    },
]
</script>

<template>
  <nav class="bg-slate-200/80 backdrop-blur border-t border-gray-400 relative z-10">
    <ul class="flex">
      <li v-for="{ icon, name, link } of navigation" class="grow flex justify-center">
        <nuxt-link :to="link" class="flex flex-col items-center py-3 px-2 text-center text-black">
            <component :is="icon" class="w-6 h-6 mb-1" />
            <div class="text-xs">{{ name }}</div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
