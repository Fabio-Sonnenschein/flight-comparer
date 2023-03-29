<template>
  <div class="home-container">
    <div class="map-container">
      <div id="map"></div>
    </div>
    <div class="detail-container">
      <MapSelection_Airport
          :airportData="this.airportData"
          v-if="showAirportDetails" />
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent, ref} from 'vue';
import ErrorComponent from '@/components/Error.vue';

const MapSelection_Airport = defineAsyncComponent({
  loader: () => import("@/components/MapSelection_Airport.vue"),
  errorComponent: ErrorComponent,
  onError(error, retry, fail, attempts) {
    console.warn(attempts);
    console.error(error);
    fail();
  }
});

let map;

export default {
  components: {
    MapSelection_Airport
  },
  data: function() {
    return {
      airports: new Map(),
      airportMarkers: [],
      showAirportDetails: ref(false),
      airportData: {
        airportCode: "",
        airportName: "",
        airportCity: "",
        airportCountry: "",
        airportCountryA2: ""
      }
    }
  },
  methods: {
    getAirportsMap() {
      return this.airports;
    },

    getFlagEmoji() {
      let charArray = this.airportData.airportCountryA2.toUpperCase().split('').map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...charArray);
    },

    async apiGETAirports() {
      const request = await fetch("http://127.0.0.1:8080/airport/all");
      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();
      this.displayAirports(response);
    },

    displayAirports(airportList) {
      for (let airport of airportList) {
        this.airports.set(airport._id, airport);
        let marker = L.marker([airport.position.latitude, airport.position.longitude])
            .addTo(map);
        //marker.bindPopup(`<b>${airport.code}</b> - ${airport.name}<br>${airport.location.city}, ${airport.location.country}`);

        marker.on("click", () => {
          this.airportSelected(airport._id)
        });
        this.airportMarkers.push(marker);
      }
    },

    airportSelected(airportId) {
      this.showAirportDetails = ref(true);
      this.airportData.airportCode = this.getAirportsMap().get(airportId).code;
      this.airportData.airportName = this.getAirportsMap().get(airportId).name;
      this.airportData.airportCity = this.getAirportsMap().get(airportId).location.city;
      this.airportData.airportCountry = this.getAirportsMap().get(airportId).location.country;
      this.airportData.airportCountryA2 = this.getAirportsMap().get(airportId).location.countryA2;
    }
  },
  mounted() {
    map = L.map('map').setView([23.725011735951796, 13.0078125], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.apiGETAirports();
  },
  setup() {
  }
}
</script>

<style scoped>
.home-container {
  height: calc(100vh - 2rem);
  display: grid;
  grid-template-rows: 3fr 1fr;
}

.map-container {
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px -7px var(--color-background-least);
}

#map {
  width: 100%;
  height: 100%;
}

.detail-container {
  background-color: var(--color-background);
  border-radius: 16px;
  padding: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 var(--color-background-least);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
