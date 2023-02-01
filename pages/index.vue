<template>
  <div class="flex flex-col gap-4 px-4 pb-8 overflow-hidden">
    <!-- country -->
    <!-- <ui-select v-model="selectedTimeZoneObject" :options="timeZonesToLabledValue(timezones)" /> -->

    <!-- map -->
    <map-usa />

    <!--   result -->
    <ul class="flex rounded-xl overflow-hidden">
      <li v-for="{ name, value, color } in zones" :key="name" class="flex flex-col py-4 w-full text-center"
        :style="`background-color: ${color}`">
        <span class="text-gray-700 font-bold text-sm">{{ name }}</span>
        <span class="text-xl font-bold text-white">{{ convertTZ(value) }}</span>
      </li>
    </ul>


    <!-- country -->
    <ui-select v-model="selectedTimeZoneObject" :options="timeZonesToLabledValue(timezones)" />

    <!-- selector -->
    <div class="bg-sky-50 px-4 py-6 rounded-xl text-center">
      <input v-model="time" type="time" class="text-3xl bg-transparent mb-6" />
      <input v-model="rangeTime" type="range" min="0" max="86340000" step="60000" class="w-full" />
    </div>

  </div>
</template>

<script setup>
let time = ref("00:00");
let timezones = ref([]);
let selectedTimeZone = reactive({});

onMounted(async () => {
  const tzRes = await fetch(
    "https://raw.githubusercontent.com/dmfilipenko/timezones.json/master/timezones.json"
  );
  timezones.value = await tzRes.json();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  Object.assign(selectedTimeZone, timezones.value.find(({ utc = [] }) =>
    utc.includes(timezone)
  ))

  time.value = new Date().toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: false,
  });
});

const zones = computed(() => {
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

  return timezones.value.reduce((acc, zone) => {
    const current = USTimeZones.find(({ value }) => value === zone.value);

    if (current) {
      acc.push({
        ...zone,
        ...current,
      });
    }
    return acc;
  }, []);
});

const selectedTimeZoneObject = computed({
  get() {
    return selectedTimeZone?.text;
  },
  set(value) {
    selectedTimeZone = timezones.value.find(({ text }) => text === value);
  },
});

const rangeTime = computed({
  get() {
    return timeToMs(time.value);
  },
  set(value) {
    time.value = msToTime(value);
  },
});

function convertTZ(tzString) {
  const timeZone = timezones.value.find(({ value }) => value === tzString).utc[0];
  const today = new Date();
  const splitTime = time.value.split(":");
  today.setHours(splitTime[0], splitTime[1], 0);
  return today.toLocaleTimeString("en-US", {
    timeZone,
    timeStyle: "short",
    hour12: false,
  });
}

function timeToMs(timeString = "00:00") {
  const hours = timeString.split(":")[0];
  const minutes = timeString.split(":")[1];
  return hours * 3600000 + minutes * 60000;
}

function msToTime(ms = 0) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const format = (value) => `${value < 10 ? "0" : ""}${value}`;
  return format(hours) + ":" + format(minutes);
}

function timeZonesToLabledValue(array) {
  return array.map(item => ({
    ...item,
    label: item.text,
    value: item.text,
  }))
}
</script>
