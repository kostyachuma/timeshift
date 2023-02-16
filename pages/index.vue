<template>
  <div class="flex flex-col px-4 pt-4 pb-8 overflow-hidden grow">
    <!-- country -->
    <ui-select
      value="United States"
      :options="countryesOptions"
      class="relative z-10"
    />

    <map-leaflet class="absolute w-full h-full left-0 top-0 z-0"/>

    <!-- <map-usa /> -->

    <!--   result -->
    <div class="flex flex-col gap-2 relative z-10 mt-auto">
      <ul class="mt-auto flex rounded-xl overflow-hidden">
        <li v-for="{ name, time, color } in zones" :key="name" class="flex flex-col py-3 w-full text-center"
          :style="`background-color: ${color}`">
          <span class="text-gray-700 font-bold text-xs">{{ name }}</span>
          <span class="text-xl font-bold text-white">{{ time }}</span>
        </li>
      </ul>

      <ui-select v-model="selectedTimeZoneObject" :options="timeZoneOptions" />

      <ui-time-range v-model="time" />
    </div>
  </div>
</template>

<script setup>
import timezones from '@/lib/timezones.json'

const USTimeZones = [
  {
    value: "Pacific Standard Time",
    name: "Pacific",
    color: "#edc282",
  },
  {
    value: "Mountain Standard Time",
    name: "Mauntain",
    color: "#fc8ca1",
  },
  {
    value: "Central Standard Time",
    name: "Central",
    color: "#95b5e0",
  },
  {
    value: "Eastern Standard Time",
    name: "Eastern",
    color: "#d5e378",
  },
];

let time = ref("00:00");
let selectedTimeZone = reactive({});

onMounted(async () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  Object.assign(selectedTimeZone, timezones.find(({ utc = [] }) =>
    utc.includes(timezone)
  ))

  time.value = new Date().toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: false,
  });
});

const countryesOptions = [
  {
    label: 'United States',
    value: 'United States',
  }
]

const selectedTimeZoneObject = computed({
  get() {
    return selectedTimeZone?.text;
  },
  set(value) {
    selectedTimeZone = timezones.find(({ text }) => text === value);
  },
});

const timeZoneOptions = timezones.map(item => ({
  ...item,
  label: item.text,
  value: item.text,
}))

const zones = computed(() => {
  return timezones.reduce((acc, zone) => {
    const current = USTimeZones.find(({ value }) => value === zone.value);

    if (current) {
      const today = new Date();
      const splitTime = time.value.split(":");

      today.setHours(splitTime[0], splitTime[1], 0);

      acc.push({
        ...zone,
        ...current,
        time: today.toLocaleTimeString("en-US", {
          timeZone: zone.utc[0],
          timeStyle: "short",
          hour12: false,
        })
      });
    }
    return acc;
  }, []);
});
</script>
