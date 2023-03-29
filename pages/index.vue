<template>
  <layout-main>
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
          class="shrink-0 bg-slate-200 rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
          @click="collapse"
        >
          <collapse-icon class="w-8 h-8 fill-current text-black" />
        </button>
      </div>
    </template>

    <template #list>
        <draggable
          v-model="zonesList"
          group="transition-group"
          item-key="name"
          :class="[editing ? 'cursor-pointer' : 'pointer-events-none']"
          class="flex flex-col gap-2"
        >
          <template #item="{element: { color, name, time }}">
            <div class="flex items-center gap-2">
              <bars-icon v-if="editing" class="w-6 h-6 fill-current text-white" />
              <div
                :style="`background-color: ${color};`"
                :class="[collapsed ? 'justify-center' : '']"
                class="flex items-center p-4 rounded-xl grow"
              >
                <div v-if="!collapsed" class="text-base mr-auto">{{ name }}</div>
                <div class="font-bold text-xl text-black">{{ time }}</div>
              </div>

              <!-- options -->
              <button
                v-if="editing"
                class="cursor-pointer shrink-0 bg-red-500 hover:bg-red-600 transition-colors rounded-xl w-12 h-12 relative z-10 flex justify-center items-center"
                @click="removeTimezone(name)"
              >
                <remove-icon class="w-6 h-6 fill-current text-white" />
              </button>
            </div>
          </template>
        </draggable>
    </template>

    <template #slider>
      <div class="flex">
        <div
          v-for="{ color, name, time } of zonesList"
          :key="name"
          :style="`background-color: ${color};`"
          class="p-4"
        >
          <div class="text-sm">{{ name }}</div>
          <div class="text-base">{{ time }}</div>
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
  // import ListIcon from '@/assets/icons/list.svg?component';
  // import MapIcon from '@/assets/icons/map.svg?component';
  import EditIcon from '@/assets/icons/edit.svg?component';
  import CollapseIcon from '@/assets/icons/collapse.svg?component';
  import RemoveIcon from '@/assets/icons/remove.svg?component';
  import BarsIcon from '@/assets/icons/bars.svg?component';
  

  import { convertTime } from '@/helpers'
  import { COLORS } from '@/constants'

  // -- Data
  let menu = ref(false);
  let collapsed = ref(true);
  let editing = ref(false);
  let drag = ref(false);

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
            acc.push({ id: name, offset, time: tzTime, color });
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
