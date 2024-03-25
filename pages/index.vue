<script setup>
  import _ from 'lodash'
  import ct from "countries-and-timezones";
  import { useResizeObserver } from '@vueuse/core'
  import { convertTimeByTimeZoneName, convertTimeByTimeZoneUTCOffset } from '@/helpers'
  import { timeZonesNamesByOffset, COLORS } from '@/constants'

  // Icons
  import MarkerIcon from '@/assets/icons/marker.svg?component';
  import ResetIcon from "@/assets/icons/reset.svg?component";

  // -- Data
  let menu = ref(false);
  let collapsed = ref(true);
  let editing = ref(false);
  let isList = ref(true);

  // watch resize if size < 1024px then isList = false
  useResizeObserver(document.documentElement, (entries) => {
    const { width } = entries[0].contentRect;

    isList.value = width > 1023;
  });

  let timeZone = ref("America/New_York");
  let time = ref("00:00");

  let _selectedCountry = ref("");
  let selectedCountry = computed({
    get: () => _selectedCountry.value || localStorage.getItem('selectedCountry') || 'US',
    set: (value) => {
      _selectedCountry.value = value;
      localStorage.setItem('selectedCountry', value)
    }
  });

  let _selectedZones = ref(null);
  let selectedZones = computed({
    get: () => {
      if (_selectedZones.value) {
        return _selectedZones.value;
      }

      if (localStorage.getItem('selectedZones')) {
        return JSON.parse(localStorage.getItem('selectedZones'));
      }

      return [];
    },
    set: (value) => {
      _selectedZones.value = [...value];
      localStorage.setItem('selectedZones', JSON.stringify(value));
    }
  });

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
    const groupByOffset = _.groupBy(selectedZones.value, 'utcOffsetStr');

    const formatedGroups = Object.entries(groupByOffset).map(([key, zones]) => {
      const data = timeZonesNamesByOffset.find(
        ({ utcOffsetStr }) => utcOffsetStr === key
      );

      const name = data?.name || '';
      const utcOffsetStr = data?.utcOffsetStr || '';
      const dstOffsetStr = data?.dstOffsetStr || '';

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

    startTime();
  });

  // -- Watch
  watch(selectedCountry, (value) => {
    if (!value) {
      console.warn('Country is not selected');
    }

    const countryZones = ct.getTimezonesForCountry(value) || [];
    const arr = [...countryZones, ...selectedZones.value].sort(
      (a, b) => a.dstOffset - b.dstOffset
    )

    selectedZones.value = [...arr];
  }, {
    immediate: true,
  })

  onBeforeUnmount(() => {
    stopTime();
  });

  // -- Methods
  const timeInterval = ref(null);
  const resetAvailable = computed(() => timeInterval.value === null);

  const startTime = () => {
    const startInterval = () => {
      time.value = new Date()
        .toLocaleTimeString("en-US", {
          timeStyle: "short",
          hour12: false,
        });
    }

    startInterval();

    timeInterval.value = setInterval(startInterval, 1000);
  }

  const stopTime = () => {
    clearInterval(timeInterval.value);
    timeInterval.value = null;
  }

  const removeTimezone = (zone) => {
    const array = selectedZones.value.filter(({ name }) => name !== zone);

    selectedZones.value = [...array];
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
    selectedZones.value = [];
    selectedCountry.value = country;
  };

  const selectZone = (zone) => {
    const array = _.xorBy(selectedZones.value, [ct.getTimezone(zone)], 'name');

    selectedZones.value = [...array];
  };
</script>

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
        >
          <template #left>
            <marker-icon class="w-6 h-6 fill-current text-black" />
          </template>
        </ui-input>

        <!-- <button class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center lg:hidden">
          <list-icon class="w-8 h-8 fill-current text-black" />
        </button> -->
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

    <!-- timeInterval -->
    <template #range>
      <ui-time-range
        v-model="time"
        :description="timeZone"
        @input="stopTime"
      >
        <template v-if="resetAvailable" #right>
          <button
            class="flex bg-slate-200 rounded-xl py-1.5 px-4 justify-center items-center text-base text-black"
            @click="startTime"
          >
            <reset-icon class="w-3.5 h-3.5 mr-1 fill-current text-black" /> Reset
          </button>
        </template>
      </ui-time-range>
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
