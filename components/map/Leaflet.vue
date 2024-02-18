<script>
import L from 'leaflet'

globalThis.L = L

const { latLng, geoJSON } = L

// libs
import _ from 'lodash'
import tzlookup from "tz-lookup";
import { LMap, LGeoJson, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'

// styles
import "leaflet/dist/leaflet.css";
import 'vue-leaflet-markercluster/dist/style.css'

// data
import geojson from "@/lib/geo.json";
import countrySettings from "@/lib/country-settings.json";

// helpers
import { convertTimeByTimeZoneName } from '@/helpers'
import { COLORS } from '@/constants'

/**
 * @todo move to .env
 */
const accessToken = '8FYQGFW7TbGM9vBzLzKaXad3djo2XPNmbF17eJXxQNf8PozitsjuzTcvmdDsVpCn'

export default {
  name: "MapLeaflet",

  components: {
    LMap,
    LGeoJson,
    LTileLayer,
    LMarker,
    LIcon,
    LMarkerClusterGroup,
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
      renderMarkers: true
    }
  },

  computed: {
    map () {
      return {
        zoom: this.zoom,
        center: this.center,
        options: {
          maxBoundsViscosity: 1.0,
          zoomControl: false,
          minZoom: 2,
          maxZoom: 12,
          maxBounds: [[-90,-180], [90,180]],
        }
      }
    },

    tileLayer () {
      return {
        url: [
          `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`,
          `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
        ][1], // theme
        options: {
          attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      }
    },

    markerClusterGroup () {
      return {
        maxClusterRadius: 35,
        showCoverageOnHover: false
      }
    },

    geo () {
      const zones = this.zones // ct.getTimezonesForCountry(this.country);

      const filter = ({ properties }) => {
        return zones
          .map(({ name }) => name)
          .includes(properties.tzid)
      }

      const map = (feature) => {
        const { tzid } = feature.properties

        const utc = zones.find(({ name }) => name === tzid)
        const offset = parseInt(utc?.utcOffsetStr.split(':'))

        return {
          ...feature,
          properties: {
            ...feature.properties,
            utc: offset,
            color: COLORS[Math.abs(offset || 0)],
          }
        }
      }

      return geojson.features
        .filter(filter)
        .map(map)
    },

    markers () {
      return this.geo.map((feature) => ({
        latlng: geoJSON(feature).getBounds().getCenter(),
        time: convertTimeByTimeZoneName(this.time, feature?.properties?.tzid),
        color: feature?.properties?.color || 'red',
      }))
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

      if (!latlng) {
        return
      }

      const { lat, lng } = latlng

      this.$emit('select-zone', tzlookup(lat, lng))
    },

    forceRerenderMarkers: _.debounce(function () {
      console.log('forceRerenderMarkers')

      this.renderMarkers = false

      this.$nextTick(() => {
        this.renderMarkers = true
      })
    }, 100)
  }
};
</script>

<template>
  <l-map
    v-bind="map"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
    @click="handleClick"
  >
    <l-tile-layer v-bind="tileLayer"/>

    <l-geo-json
      :geojson="geo"
      :options-style="style"
    />

    <l-marker-cluster-group
      v-if="renderMarkers"
      v-bind="markerClusterGroup"
      @animationend="forceRerenderMarkers"
    >
      <l-marker
        v-for="({ latlng, time, color }, index) of markers"
        :key="`marker-${index}`"
        :lat-lng="latlng"
      >
        <l-icon class-name="relative">
          <div class="marker" :style="`--color: ${color}`">{{ time }}</div>
        </l-icon>
      </l-marker>
    </l-marker-cluster-group>
  </l-map>
</template>

<style>
.marker {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-5 bg-white py-1 px-2 rounded text-sm text-black;

  &:before {
    content: '';
    background-color: var(--color, red);

    @apply block w-full h-0.5 rounded;
  }
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
