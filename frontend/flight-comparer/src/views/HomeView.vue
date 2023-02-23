<template>
  <div class="home-container">
    <div class="map-container">
      <div id="map"></div>
    </div>
    <div class="detail-container">
      <div id="no-selection" v-if="this.selection === 'none'">
        <h1>Nothing selected</h1>
        <p>Try clicking something on the map to see more details</p>
      </div>
      <div id="airport-selected" v-if="this.selection === 'airport'">
        <h1>{{ airportCode }}</h1>
        <h2>{{ airportName }}</h2>
        <p>{{ airportCity }}, {{ airportCountry }} {{ this.getFlagEmoji() }}</p>
      </div>
      <div id="flight-selected" v-if="this.selection === 'flight'">

      </div>
    </div>
  </div>
</template>

<script>
let map;

export default {
  data: function() {
    return {
      airports: new Map(),
      airportMarkers: [],
      selection: "none",
      airportCode: "",
      airportName: "",
      airportCity: "",
      airportCountry: "",
      airportCountryA2: ""
    }
  },
  methods: {
    getAirportsMap() {
      return this.airports;
    },

    getFlagEmoji() {
      let charArray = this.airportCountryA2.toUpperCase().split('').map((char) => 127397 + char.charCodeAt(0));
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
      this.selection = "airport";
      this.airportCode = this.getAirportsMap().get(airportId).code;
      this.airportName = this.getAirportsMap().get(airportId).name;
      this.airportCity = this.getAirportsMap().get(airportId).location.city;
      this.airportCountry = this.getAirportsMap().get(airportId).location.country;
      this.airportCountryA2 = this.getAirportsMap().get(airportId).location.countryA2;
    }
  },
  mounted: function() {
    map = L.map('map').setView([23.725011735951796, 13.0078125], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.apiGETAirports();
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
  box-shadow: 0 0 10px -7px var(--black-least);
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
  box-shadow: 0 0 10px 0 var(--white-least);
  display: flex;
}
</style>
