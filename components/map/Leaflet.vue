<template>
  <div class="">
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="map"
      @update:center="centerUpdate"
      @click="handleClick"
    >
      <l-tile-layer
        :url="providerURL"
        :options="tileOptions"
      />
      <l-geo-json
        :geojson="geo"
        :options-style="style"
      />
      <l-marker
        v-for="{ latlng, time }, index of formatedMarkers"
        :key="index"
        :lat-lng="latlng"
      >
        <l-icon class-name="relative">
          <div class="marker">{{ time }}</div>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>
  
<script>
import { LMap, LGeoJson, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";

import _ from 'lodash'
import tzlookup from "tz-lookup";

import geojson from "@/lib/geo.json";
import countrySettings from "@/lib/country-settings.json";

import { COLORS } from '@/constants'
import { convertTimeByTimeZoneName } from '@/helpers'

const accessToken = '8FYQGFW7TbGM9vBzLzKaXad3djo2XPNmbF17eJXxQNf8PozitsjuzTcvmdDsVpCn'

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer,
    LMarker,
    LIcon,
  },
  props: {
    country: {
      type: String,
      default: ''
    },
    zones: {
      type: Array,
      default: () => []
    },
    time: {
      type: String,
      default: '00:00'
    }
  },
  data () {
    return {
      zoom: 3,
      center: latLng(33.54139466898275, -97.60253906250001),
      countrySettings,
      markers: [],
    }
  },
  computed: {
    providerURL() {
      return [
        `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`,
        `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
      ][1]
    },
    tileOptions() {
      return {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    mapOptions () {
      return {
        maxBoundsViscosity: 1.0,
        zoomControl: false,
        minZoom: 2,
        maxZoom: 12,
        maxBounds: [[-90,-180], [90,180]],
      }
    },
    geo () {
      const zones = this.zones // ct.getTimezonesForCountry(this.country);

      return geojson.features
        .filter(({ properties }) => {
          return zones
            .map(({ name }) => name)
            .includes(properties.tzid)
        })
        .map((feature) => {
          const { tzid } = feature.properties

          const utc = zones.find(({ name }) => name === tzid)
          const offset = parseInt(utc?.utcOffsetStr.split(':'))

          return {
            ...feature,
            properties: {
              ...feature.properties,
              utc: offset,
              color: COLORS[Math.abs(offset || 0)]
            }
          }
        })
    },
    formatedMarkers () {
      return this.markers.map(marker => {
        return {
          ...marker,
          time: convertTimeByTimeZoneName(this.time, marker.timeZone)
        }
      })
    }
  },
  watch: {
    country: {
      handler () {
        const { center, zoom } = this.countrySettings[this.country] || this.countrySettings.US

        this.zoomUpdate(zoom)

        setTimeout(() => {
          this.centerUpdate(center)
        }, 500)
      },
      immediate: true
    },
  },
  methods: {
    style ({ properties }) {
      return { color: properties?.color || '#95b5e0' }
    },
    centerUpdate (center) {
      this.center = center
    },
    zoomUpdate (zoom) {
      this.zoom = zoom
    },
    handleClick (e) {
      const latlng = e?.latlng

      if (latlng) {
        this.markers = _.xorBy(this.markers, [{
          latlng,
          timeZone: tzlookup(latlng.lat, latlng.lng)
        }], 'timeZone')

        this.$emit('select-zone', tzlookup(latlng.lat, latlng.lng))
      }
    }
  }
};
</script>

<style>
.map {
    background: #c9d2d3;
}

.marker {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-5 bg-white py-1 px-2 rounded text-sm text-black;
}

.marker::after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: currentColor transparent transparent transparent;

  @apply absolute top-full left-1/2 -translate-x-1/2 text-white;
}
</style>
