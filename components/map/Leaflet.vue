<template>
  <div class="">
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      class="map"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="providerURL"
        :options="tileOptions"
      />
      <l-geo-json
        :geojson="geo"
        :options-style="style"
      />
    </l-map>
  </div>
</template>
  
<script>
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import geojson from "@/lib/geo.json";
import countrySettings from "@/lib/country-settings.json";
import ct from 'countries-and-timezones';
import { COLORS } from '@/constants'

const accessToken = '8FYQGFW7TbGM9vBzLzKaXad3djo2XPNmbF17eJXxQNf8PozitsjuzTcvmdDsVpCn'

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer,
  },
  props: {
    country: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      zoom: 3,
      center: latLng(28.9, -97.9),
      countrySettings,
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
      const zones = ct.getTimezonesForCountry(this.country);

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
  },
  watch: {
    country: {
      handler (country) {
        const { center, zoom } = this.countrySettings[country] || this.countrySettings.US

        this.centerUpdate(center)

        this.$nextTick(() => {
          this.zoomUpdate(zoom)
        })
      },
      immediate: true
    }
  },
  methods: {
    style (feature) {
      return { color: feature?.properties?.color || '#95b5e0' }
    },
    centerUpdate (center) {
      this.center = center
    },
    zoomUpdate (zoom) {
      this.zoom = zoom
    },
  }
};
</script>

<style>
.map {
    background: #c9d2d3;
}
</style>
