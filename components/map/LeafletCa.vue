<template>
  <l-map
    ref="map"
    :options="settings"
    class="map"
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
</template>
  
<script>
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import geojson from "@/lib/geo.json";
import ct from 'countries-and-timezones';
const accessToken = '8FYQGFW7TbGM9vBzLzKaXad3djo2XPNmbF17eJXxQNf8PozitsjuzTcvmdDsVpCn'

const colors = [
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
  data() {
    return {
      geojson: geojson,
      tileOptions: {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    };
  },
  computed: {
    settings () {
      const defaultSettings = {
        maxBoundsViscosity: 1.0,
        zoomControl: false,
        zoom: 3.5,
        minZoom: 3,
        maxZoom: 5,
        maxBounds: [
          //south west
          [84.16692790181882, 179.89894627868037],
          //north east
          [-64.61290574810766, -178.74074630796935]
        ],
      }

      const countrySettings = {
        US: {
          zoom: 3.5,
          minZoom: 3,
          maxZoom: 5,
          center: [28.976730551346048, -97.99363741643089],
          // maxBounds: [
          //   //south west
          //   [53.874317711077076, -65.04369400589722],
          //   //north east
          //   [2.815201458869358, -126.86267908028181]
          // ],
        }
      }

      return {
        ...defaultSettings,
        ...(countrySettings[this.country] || [])
      }
    },
    geo () {
      const zones = ct.getTimezonesForCountry(this.country);

      return this.geojson.features
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
              color: colors[Math.abs(offset || 0)]
            }
          }
        })
    },
    providerURL() {
      return [
        `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`,
        `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
      ][1]
    }
  },
  // mounted () {
  //   const timezones = ct.getTimezonesForCountry('US');
  //   console.log(timezones);
  // },
  methods: {
    style (feature) {
      return { color: feature?.properties?.color || '#95b5e0' }
    }
  }
};
</script>

<style>
.map {
    background: #c9d2d3;
}
</style>
