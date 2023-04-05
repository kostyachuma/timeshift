<template>
  <layout-main :is-list="isList">
    <template #menu>
      <select-menu
        :show="menu"
        :options="countryes"
        @update:modelValue="selectCountry($event.value)"
        @close="menu = false"
      />
    </template>

    <template #head>
      <div class="flex gap-2">
        <ui-input
          :modelValue="countryes.find(({ value }) => value === selectedCountry)?.label"
          readonly
          class="relative z-10"
          @click="menu = true"
        />
        <button
          class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
          @click="edit"
        >
          <edit-icon class="w-6 h-6 fill-current text-black" />
        </button>

        <button
          class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center lg:hidden"
          @click="isList = !isList"
        >
          <list-icon class="w-8 h-8 fill-current text-black" />
        </button>
      </div>
    </template>

    <template #list>
        <draggable
          v-model="zonesList"
          :disabled="!editing"
          group="transition-group"
          item-key="name"
          class="flex flex-col gap-2"
        >
          <template #item="{ element: { color, name, time } }">
            <div class="flex items-center gap-2">
              <bars-icon
                v-if="editing"
                class="shrink-0 w-6 h-6 fill-current text-white"
              />

              <div
                :style="`background-color: ${color}`"
                class="flex grow p-4 gap-4 rounded-xl min-w-0 cursor-pointer"
                @click="collapse"
              >
                <div class="truncate flex-1 text-base text-black">{{ name }}</div>
                <div class="whitespace-nowrap font-bold text-xl text-black">{{ time }}</div>
              </div>

              <button
                v-if="editing"
                class="shrink-0 cursor-pointer bg-red-500 hover:bg-red-600 transition-colors rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
                @click="removeTimezone(name)"
              >
                <remove-icon class="w-6 h-6 fill-current text-white" />
              </button>
            </div>
          </template>
        </draggable>
    </template>

    <template #slider>
      <div class="flex overflow-auto scrollbar-hide">
        <div
          v-for="{ color, name, time } of zonesList"
          :key="name"
          class="grow first:pl-4 last:pr-4 first:rounded-tl-xl first:rounded-bl-xl last:rounded-tr-xl last:rounded-br-xl"
        >
          <div
            :style="`background-color: ${color};`"
            class="p-4"
          >
            <div class="whitespace-nowrap text-center text-sm">{{ name }}</div>
            <div class="whitespace-nowrap text-center text-lg font-bold">{{ time }}</div>
          </div>
        </div>
      </div>
    </template>

    <template #range>
      <ui-time-range
        v-model="time"
        :description="timeZone"
      />
    </template>

    <template #main>
      <map-leaflet
        :country="selectedCountry"
        :zones="selectedZones"
        :time="time"
        class="absolute w-full h-full left-0 top-0 z-0"
        @select-zone="selectZone"
      />
    </template>
  </layout-main>
</template>

<script setup>
  // -- Imports
  import _ from 'lodash'
  import ct from "countries-and-timezones";
  import draggable from 'vuedraggable'

  // Icons
  import ListIcon from '@/assets/icons/list.svg?component';
  // import MapIcon from '@/assets/icons/map.svg?component';
  import EditIcon from '@/assets/icons/edit.svg?component';
  // import CollapseIcon from '@/assets/icons/collapse.svg?component';
  import RemoveIcon from '@/assets/icons/remove.svg?component';
  import BarsIcon from '@/assets/icons/bars.svg?component';

  import { convertTime } from '@/helpers'
  import { COLORS } from '@/constants'

  const timeZonesNamesByOffset = [
    {
      "offset": -11,
      "name": "Midway Island, Samoa"
    },
    {
      "offset": -10,
      "name": "Hawaii"
    },
    {
      "offset": -9,
      "name": "Alaska"
    },
    {
      "offset": -8,
      "name": "Pacific Time (US & Canada)"
    },
    {
      "offset": -7,
      "name": "Mountain Time (US & Canada)"
    },
    {
      "offset": -6,
      "name": "Central Time (US & Canada), Mexico City"
    },
    {
      "offset": -5,
      "name": "Eastern Time (US & Canada), Bogota, Lima"
    },
    {
      "offset": -4,
      "name": "Atlantic Time (Canada), Caracas, La Paz"
    },
    {
      "offset": -3,
      "name": "Greenland, Brasilia, Buenos Aires",
    },
    {
      "offset": -2,
      "name": "Mid-Atlantic"
    },
    {
      "offset": -1,
      "name": "Azores, Cape Verde Islands"
    },
    {
      "offset": 0,
      "name": "Western Europe Time, London, Lisbon, Casablanca"
    },
    {
      "offset": 1,
      "name": "Brussels, Copenhagen, Madrid, Paris"
    },
    {
      "offset": 2,
      "name": "Kaliningrad, South Africa"
    },
    {
      "offset": 3,
      "name": "Baghdad, Riyadh, Moscow, St. Petersburg"
    },
    {
      "offset": 4,
      "name": "Abu Dhabi, Muscat, Baku, Tbilisi"
    },
    {
      "offset": 5,
      "name": "Ekaterinburg, Islamabad, Karachi, Tashkent"
    },
    {
      "offset": 6,
      "name": "Almaty, Dhaka, Colombo"
    },
    {
      "offset": 7,
      "name": "Bangkok, Hanoi, Jakarta"
    },
    {
      "offset": 8,
      "name": "Beijing, Perth, Singapore, Hong Kong"
    },
    {
      "offset": 9,
      "name": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
    },
    {
      "offset": 10,
      "name": "Eastern Australia, Guam, Vladivostok"
    },
    {
      "offset": 11,
      "name": "Magadan, Solomon Islands, New Caledonia"
    },
    {
      "offset": 12,
      "name": "Auckland, Wellington, Fiji, Kamchatka"
    }
  ]

  // -- Data
  let menu = ref(false);
  let collapsed = ref(true);
  let editing = ref(false);
  let isList = ref(true);

  let timeZone = ref("America/New_York");
  let time = ref("00:00");
  let selectedCountry = ref("US");
  let selectedZones = reactive([]);

  // -- Computed
  const countryes = computed(() => {
    const allCountries = ct.getAllCountries();

    return Object.values(allCountries)
      .map((country) => ({
        ...country,
        label: country.name,
        value: country.id,
      }));
  });

  const zonesList = computed({
    get () {
      return selectedZones
        .reduce((acc, { utcOffsetStr, name }) => {
          const offset = parseInt(utcOffsetStr.split(':')[0]);
          const tzTime = convertTime(time.value, name);
          const color = COLORS[Math.abs(offset || 0)];

          const exist = acc.some(({ offset: accOffset }) => accOffset === offset);

          if (!collapsed.value) {
            acc.push({ id: name, offset, name, time: tzTime, color });
          } else if (!exist) {
            const { name: offsetName } = timeZonesNamesByOffset.find(({ offset: tzOffset }) => tzOffset === offset);

            acc.push({ id: name, offset, name: offsetName, time: tzTime, color });
          }

          return acc;
        }, [])
    },
    set (value) {
      const arr = value.map(({ id }) => ({ ...ct.getTimezone(id), id }))

      selectedZones.length = 0;
      selectedZones.push(...arr)
    }
  });

  // -- Mounted
  onMounted(async () => {
    timeZone = Intl
      .DateTimeFormat()
      .resolvedOptions()
      .timeZone;

    time.value = new Date()
      .toLocaleTimeString("en-US", {
        timeStyle: "short",
        hour12: false,
      });
  });

  // -- Watch
  watch(selectedCountry, (value) => {
    if (!value) {
      console.warn('Country is not selected');
    }

    const countryZones = ct.getTimezonesForCountry(value) || [];
    const arr = [...countryZones, ...selectedZones].sort(
      (a, b) => a.dstOffset - b.dstOffset
    )

    selectedZones.length = 0;
    selectedZones.push(...arr)
  }, {
    immediate: true,
  })

  // -- Methods
  const removeTimezone = (zone) => {
    const array = selectedZones.filter(({ name }) => name !== zone);

    selectedZones.length = 0;
    selectedZones.push(...array);
  };

  const collapse = () => {
    collapsed.value = !collapsed.value;
    editing.value = false;
  };

  const edit = () => {
    editing.value = !editing.value;
    collapsed.value = false;
  };

  const selectCountry = (country) => {
    selectedZones.length = 0;
    selectedCountry.value = country;
  };

  const selectZone = (zone) => {
    const array = _.xorBy(selectedZones, [ct.getTimezone(zone)], 'name');

    selectedZones.length = 0;
    selectedZones.push(...array);
  };
</script>
