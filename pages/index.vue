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
          class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center lg:hidden"
          @click="isList = !isList"
        >
          <list-icon class="w-8 h-8 fill-current text-black" />
        </button>
      </div>
    </template>

    <template #list>
        <!-- @edit="edit" -->
        <list
          :modelValue="zonesList"
          :editing="editing"
          @collapse="collapse"
          @remove-timezone="removeTimezone"
          @update:modelValue="zonesList = $event"
        />
    </template>

    <template #slider>
      <slider :zones-list="zonesList" />
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

  // Icons
  import ListIcon from '@/assets/icons/list.svg?component';
  // import MapIcon from '@/assets/icons/map.svg?component';
  // import EditIcon from '@/assets/icons/edit.svg?component';
  // import CollapseIcon from '@/assets/icons/collapse.svg?component';

  import { convertTimeByTimeZoneName, convertTimeByTimeZoneUTCOffset } from '@/helpers'
  import { COLORS } from '@/constants'

  const timeZonesNamesByOffset = [
    {
      "utcOffsetStr": "-11:00",
      "dstOffsetStr": "-11:00",
      "name": "Midway Island, Samoa"
    },
    {
      "utcOffsetStr": "-10:00",
      "dstOffsetStr": "-09:00",
      "name": "Hawaii"
    },
    {
      "utcOffsetStr": "-09:00",
      "dstOffsetStr": "-08:00",
      "name": "Alaska"
    },
    {
      "utcOffsetStr": "-08:00",
      "dstOffsetStr": "-07:00",
      "name": "Pacific Time (US & Canada)"
    },
    {
      "utcOffsetStr": "-07:00",
      "dstOffsetStr": "-06:00",
      "name": "Mountain Time (US & Canada)"
    },
    {
      "utcOffsetStr": "-06:00",
      "dstOffsetStr": "-05:00",
      "name": "Central Time (US & Canada), Mexico City"
    },
    {
      "utcOffsetStr": "-05:00",
      "dstOffsetStr": "-04:00",
      "name": "Eastern Time (US & Canada), Bogota, Lima"
    },
    {
      "utcOffsetStr": "-04:00",
      "dstOffsetStr": "-03:00",
      "name": "Atlantic Time (Canada), Caracas, La Paz"
    },
    {
      "utcOffsetStr": "-03:00",
      "dstOffsetStr": "-02:00",
      "name": "Greenland, Brasilia, Buenos Aires",
    },
    {
      "utcOffsetStr": "-02:00",
      "dstOffsetStr": "-01:00",
      "name": "Mid-Atlantic"
    },
    {
      "utcOffsetStr": "-01:00",
      "dstOffsetStr": "+00:00",
      "name": "Azores, Cape Verde Islands"
    },
    {
      "utcOffsetStr": "+00:00",
      "dstOffsetStr": "+01:00",
      "name": "Western Europe Time, London, Lisbon, Casablanca"
    },
    {
      "utcOffsetStr": "+01:00",
      "dstOffsetStr": "+02:00",
      "name": "Brussels, Copenhagen, Madrid, Paris"
    },
    {
      "utcOffsetStr": "+02:00",
      "dstOffsetStr": "+03:00",
      "name": "Kaliningrad, South Africa"
    },
    {
      "utcOffsetStr": "+03:00",
      "dstOffsetStr": "+04:00",
      "name": "Baghdad, Riyadh, Moscow, St. Petersburg"
    },
    {
      "utcOffsetStr": "+04:00",
      "dstOffsetStr": "+04:00",
      "name": "Abu Dhabi, Muscat, Baku, Tbilisi"
    },
    {
      "utcOffsetStr": "+05:00",
      "dstOffsetStr": "+05:00",
      "name": "Ekaterinburg, Islamabad, Karachi, Tashkent"
    },
    {
      "utcOffsetStr": "+06:00",
      "dstOffsetStr": "+06:00",
      "name": "Almaty, Dhaka, Colombo"
    },
    {
      "utcOffsetStr": "+07:00",
      "dstOffsetStr": "+07:00",
      "name": "Bangkok, Hanoi, Jakarta"
    },
    {
      "utcOffsetStr": "+08:00",
      "dstOffsetStr": "+08:00",
      "name": "Beijing, Perth, Singapore, Hong Kong"
    },
    {
      "utcOffsetStr": "+09:00",
      "dstOffsetStr": "+09:00",
      "name": "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
    },
    {
      "utcOffsetStr": "+10:00",
      "dstOffsetStr": "+10:00",
      "name": "Eastern Australia, Guam, Vladivostok"
    },
    {
      "utcOffsetStr": "+11:00",
      "dstOffsetStr": "+11:00",
      "name": "Magadan, Solomon Islands, New Caledonia"
    },
    {
      "utcOffsetStr": "+12:00",
      "dstOffsetStr": "+12:00",
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

  const zonesList = computed(() => {
    const groupByOffset = _.groupBy(selectedZones, 'utcOffsetStr');

    const formatedGroups = Object.entries(groupByOffset).map(([key, zones]) => {
      const { name, utcOffsetStr, dstOffsetStr } = timeZonesNamesByOffset.find(
        ({ utcOffsetStr }) => utcOffsetStr === key
      );

      const [hours, _minutes] = utcOffsetStr.split(':');

      return {
        name,
        time: convertTimeByTimeZoneUTCOffset(time.value, utcOffsetStr, dstOffsetStr),
        color: COLORS[Math.abs(+hours || 0)],
        zones,
      };
    });

    const flatGroups = formatedGroups.reduce((acc, { zones }) => {
      acc.push(...zones);

      return acc;
    }, []);

    const formatedFlatGroups = flatGroups.map(({ utcOffsetStr, name }) => {
      const offset = parseInt(utcOffsetStr.split(':')[0]);

      return {
        name,
        time: convertTimeByTimeZoneName(time.value, name),
        color: COLORS[Math.abs(offset || 0)],
      }
    })

    return collapsed.value ? formatedGroups : formatedFlatGroups;
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
