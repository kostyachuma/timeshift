<template>
  <div class="flex flex-col px-4 pt-4 pb-8 max-w-xl w-full mx-auto grow">
    <!-- country -->
    <ui-select
      v-model="selectedCountry"
      :options="countryesOptions"
      class="relative z-10"
    />

    <!-- <map-leaflet class="absolute w-full h-full left-0 top-0 z-0"/> -->
    <map-leaflet-ca
      :country="selectedCountry"
      class="absolute w-full h-full left-0 top-0 z-0"
    />

    <!-- <map-usa /> -->

    <!--   result -->
    <div class="flex flex-col gap-2 relative z-10 mt-auto overflow-hidden" @click="toggle">
      <div class="scroll-hidden mt-auto overflow-auto shadow-md">
        <ul class="whitespace-nowrap flex">
          <li
            v-for="{ name, time, color } in zones"
            :key="name"
            class="flex flex-col py-3 px-3 w-full text-center first:rounded-l-xl last:rounded-r-xl"
            :style="`background-color: ${color}`"
          >
            <span v-if="!isColapsed" class="text-gray-700 font-bold text-xs">{{ name }}</span>
            <span class="text-xl font-bold text-white">{{ time }}</span>
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

  const COLORS = [
    '#ff0000',
    '#ff8000',
    '#ffff00',
    '#80ff00',
    '#00ff00',
    '#00ff80',
    '#00ffff',
    '#0080ff',
    '#0000ff',
    '#8000ff',
    '#ff00ff',
    '#ff0080',
    '#7a97a0',
  ]

  let time = ref("00:00");
  let selectedCountry = ref("US");
  let selectedTimeZone = reactive({});
  let isColapsed = ref(true);

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
    isColapsed.value = !isColapsed.value;
  };

  const zones = computed(() => {
    const zones = ct.getTimezonesForCountry(selectedCountry.value);

    console.log(zones);

    const formated = zones
      .sort((a, b) => {
        const aOffset = parseInt(a?.utcOffsetStr.split(":"));
        const bOffset = parseInt(b?.utcOffsetStr.split(":"));

        return aOffset - bOffset;
      })
      .map((item) => {
        const offset = parseInt(item?.utcOffsetStr.split(":"));

        return {
          ...item,
          value: item.name,
          name: item.name,
          color: COLORS[Math.abs(offset || 0)],
          time: new Date().toLocaleTimeString("en-US", {
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

    return isColapsed.value ? colapsed : formated;

    // return timezones.reduce((acc, zone) => {
    //   const current = USTimeZones.find(({ value }) => value === zone.value);

    //   if (current) {
    //     const today = new Date();
    //     const splitTime = time.value.split(":");

    //     today.setHours(splitTime[0], splitTime[1], 0);

    //     acc.push({
    //       ...zone,
    //       ...current,
    //       time: today.toLocaleTimeString("en-US", {
    //         timeZone: zone.utc[0],
    //         timeStyle: "short",
    //         hour12: false,
    //       })
    //     });
    //   }
    //   return acc;
    // }, []);
  });
</script>

<style>
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
