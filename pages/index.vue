<template>
  <div class="flex flex-col gap-2 px-4 pt-4 pb-8 max-w-xl w-full mx-auto grow">
    <!-- country -->
    <div class="flex gap-2">
      <ui-select
        v-model="selectedCountry"
        :options="countryesOptions"
        class="w-full relative z-10"
      />
      <button
        class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
        @click="isList = !isList"
      >
        <list-icon v-if="!isList" class="w-8 h-8 fill-current text-black" />
        <map-icon v-else class="w-8 h-8 fill-current text-black" />
      </button>
    </div>

    <!-- map -->

    <map-leaflet
      v-if="!isList"
      :country="selectedCountry"
      class="absolute w-full h-full left-0 top-0 z-0"
    />

    <!--   result -->
    <div
      :class="{
        'mt-auto': !isList,
        'grow': isList,
      }"
      class="flex flex-col gap-2 relative z-10 max-w-full"
    >
      <div
        :class="{
          'grow': isList,
          'scroll-hidden overflow-auto': !isList
        }"
        class="relative"
        @click="toggle"
      >
        <ul
          :class="{
            'flex-col gap-2 absolute w-full h-full overflow-auto': isList,
            'flex-row': !isList,
          }"
          class="whitespace-nowrap flex">
          <li
            v-for="{ name, time, color } in zones"
            :key="name"
            :class="[isList ? 'list-item-row' : 'list-item']"
            :style="`background-color: ${color}`"
          >
            <span v-if="isList || !isColapsed" class="list-item-label text-gray-700 font-bold text-xs">{{ name }}</span>
            <span class="list-item-value text-xl font-bold text-white tabular-nums">{{ time }}</span>
          </li>
        </ul>
      </div>

      <ui-select v-model="selectedTimeZoneObject" :options="timeZoneOptions" />

      <ui-time-range v-model="time" />
    </div>
  </div>
</template>

<script setup>
  import timezones from "@/lib/timezones.json";
  import ct from "countries-and-timezones";
  import _ from 'lodash'
  import ListIcon from '@/assets/icons/list.svg?component'
  import MapIcon from '@/assets/icons/map.svg?component'
  import { COLORS } from '@/constants'

  let time = ref("00:00");
  let selectedCountry = ref("US");
  let selectedTimeZone = reactive({});
  let isColapsed = ref(true);
  let isList = ref(false);

  onMounted(async () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    Object.assign(
      selectedTimeZone,
      timezones.find(({ utc = [] }) => utc.includes(timezone))
    );

    time.value = new Date().toLocaleTimeString("en-US", {
      timeStyle: "short",
      hour12: false,
    });
  });

  const getCountryes = () => {
    const countryes = ct.getAllCountries();
    return Object.values(countryes).map((country) => {
      return {
        ...country,
        label: country.name,
        value: country.id,
      };
    });
  };

  const countryesOptions = getCountryes();

  const selectedTimeZoneObject = computed({
    get() {
      return selectedTimeZone?.text;
    },
    set(value) {
      selectedTimeZone = timezones.find(({ text }) => text === value);
    },
  });

  const timeZoneOptions = timezones.map((item) => ({
    ...item,
    label: item.text,
    value: item.text,
  }));

  const toggle = () => {
    if (isList.value) return;

    isColapsed.value = !isColapsed.value;
  };

  const zones = computed(() => {
    const zones = ct.getTimezonesForCountry(selectedCountry.value);

    const formated = zones
      .sort((a, b) => {
        const aOffset = parseInt(a?.utcOffsetStr.split(":"));
        const bOffset = parseInt(b?.utcOffsetStr.split(":"));

        return aOffset - bOffset;
      })
      .map((item) => {
        const offset = parseInt(item?.utcOffsetStr.split(":"));
        const today = new Date();
        const splitTime = time.value.split(":");

        today.setHours(splitTime[0], splitTime[1], 0);

        return {
          ...item,
          value: item.name,
          name: item.name,
          color: COLORS[Math.abs(offset || 0)],
          time: today.toLocaleTimeString("en-US", {
            timeZone: item.name,
            timeStyle: "short",
            hour12: false,
          }),
        };
    });

    const colapsed = formated.reduce((acc, zone) => {
      const item = !acc.some(({ utcOffsetStr }) => utcOffsetStr === zone.utcOffsetStr)
        ? [zone]
        : [];

      return [
        ...acc,
        ...item,
      ];
    }, []);

    return !isList.value && isColapsed.value ? colapsed : formated;
  });
</script>

<style>
.list-item {
  @apply flex flex-col py-3 px-3 w-full text-center first:rounded-l-xl last:rounded-r-xl;
}

.list-item-row {
  @apply flex items-center py-3 px-3 w-full text-center rounded-xl;
}

.list-item-row .list-item-label {
  @apply text-base mr-auto;
}

.list-item-row .list-item-value {
  @apply ml-auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scroll-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
