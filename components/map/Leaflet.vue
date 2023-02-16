<template>
  <div>
    <l-map ref="map" :options="options">
      <l-tile-layer
        :url="providerURL"
        :options="tileOptions"
      />
      <l-geo-json v-if="combined" :geojson="combined" :options-style="style" />
    </l-map>
  </div>
</template>
  
<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
// import combined from '@/lib/Time_Zones.json'

const accessToken = '8FYQGFW7TbGM9vBzLzKaXad3djo2XPNmbF17eJXxQNf8PozitsjuzTcvmdDsVpCn'

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      combined: null,
      options: {
        maxBoundsViscosity: 1.0,
        zoom: 3,
        minZoom: 3,
        maxZoom: 5,
        center: ['37.0902', '95.7129'],
        zoomControl: false,
        maxBounds: [
            //south west
            [-1.7092307402830755, -127.10324084712306],
            //north east
            [49.5904, -66.9326]
        ],
      },
      tileOptions: {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    };
  },
  computed: {
    providerURL() {
      return [
        `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${accessToken}`,
        `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${accessToken}`
      ][0]
    }
  },
  async mounted () {
    this.combined = await import('@/lib/Time_Zones.json')
  },
  methods: {
    style (feature) {
      switch (feature.properties.zone) {
            case 'Pacific': return { color: "#edc282" }
            case 'Mountain':   return { color: "#fc8ca1" }
            case 'Central':   return { color: "#95b5e0" }
            case 'Eastern':   return { color: "#d5e378" }
      }
    }
  }
};
</script>
