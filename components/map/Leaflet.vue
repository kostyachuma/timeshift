<template>
  <l-map
    ref="myMap"
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
import { latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import geojson from "@/lib/geo.json";
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
      return {
        maxBoundsViscosity: 1.0,
        zoomControl: false,
        zoom: 3.5,
        minZoom: 3,
        maxZoom: 5,
        center: latLng(28.976730551346048, -97.99363741643089),
        maxBounds: [
          //south west
          [84.16692790181882, 179.89894627868037],
          //north east
          [-64.61290574810766, -178.74074630796935]
        ],
      }
    },
    countrySettings () {
      return {
        US: {
          zoom: 3.5,
          center: latLng(28.976730551346048, -97.99363741643089),
        }
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
              color: COLORS[Math.abs(offset || 0)]
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
  // watch: {
  //   country: {
  //     handler (country) {
  //       this.centerMap(this.countrySettings[country] || this.countrySettings['US'])
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    style (feature) {
      return { color: feature?.properties?.color || '#95b5e0' }
    },
    centerMap ({ center, zoom }) {
      this.$nextTick(() => {
        const map = this.$refs.myMap.leafletObject;
        console.log(this.$refs.myMap, toRaw(this.$refs.myMap));
        map.mapObject.setView(center, zoom);
      });
    }
  }
};
</script>

<style>
.map {
    background: #c9d2d3;
}
</style>
