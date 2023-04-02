<template>
  <div class="airport-view-container">
    <div class="airport-view-header">
      <RouterLink
            to="/"
            custom
            v-slot="{navigate}">
        <span class="header-icon icon" @click="navigate" role="link">arrow_back</span>
      </RouterLink>
      <h1>{{ this.airportData.name }}</h1>
    </div>
    <div class="airport-view-content">
      <div class="airport-view-content-details">
        <div class="avc-section-container" v-if="this.hasLounges">
          <h3 class="avc-section-title">Lounges</h3>
          <div class="avc-section" v-for="lounge in this.airportData.lounges">
            <table>
              <tr>
                <th>Name</th>
                <td>{{ lounge.name }}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{{ lounge.type }}</td>
              </tr>
              <tr>
                <th>Airlines</th>
                <td>{{ lounge.airlines }}</td>
              </tr>
              <tr>
                <th>Access</th>
                <td>{{ lounge.access }}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{{ lounge.description }}</td>
              </tr>
              <tr v-if="lounge.shower">
                <th>Shower</th>
                <td>{{ lounge.shower ? 'Yes' : 'No' }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="airport-view-content-map">
        <span class="avc-map-code">
          {{ this.airportData.code }}
        </span>
        <div id="airportMap"></div>
        <p class="avc-map-location-text">{{ this.airportData.location.city }}, {{ this.airportData.location.country }}
          {{ this.getFlagEmoji() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';

let map;

const redIcon = L.icon({
  iconUrl: '../src/assets/airportMarker_red.svg',
  iconSize: [25, 31.06],
  iconAnchor: [12.5, 31]
});


export default {
  name: 'AirportView',
  data: function () {
    return {
      marker: undefined,
      knownAirlines: new Map(),
      hasLounges: false,
      airportData: {
        _id: this.$route.params.airportId,
        code: '',
        location: {
          city: '',
          country: '',
          countryA2: ''
        },
        lounges: [
          {
            access: '',
            airlines: [],
            description: '',
            name: '',
            shower: false,
            type: ''
          }
        ],
        name: '',
        position: {
          latitude: 0,
          longitude: 0
        }
      }
    };
  },
  methods: {
    async apiGETAirportById() {
      const request = await fetch('http://127.0.0.1:8080/airport/' + this.$route.params.airportId);
      if (!request.ok) {
        console.error(request.text());
      }
      this.airportData = await request.json();
    },

    async apiGETAirlineById(airlineId) {
      const request = await fetch('http://127.0.0.1:8080/airline/' + airlineId);
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async getLoungeAirlines() {
      if (this.airportData.hasOwnProperty('lounges') && this.airportData.lounges !== null) {
        this.hasLounges = this.airportData.lounges.length > 0;
      } else {
        this.hasLounges = false;
      }
      if (this.hasLounges) {
        for (let lounge of this.airportData.lounges) {
          let airlinesString = '';
          for (let airlineId of lounge.airlines) {
            if (!this.knownAirlines.has(airlineId)) {
              let airlineData = await this.apiGETAirlineById(airlineId);
              this.knownAirlines.set(airlineId, airlineData);
              airlinesString += airlineData.name + ', ';
            } else {
              airlinesString += this.knownAirlines.get(airlineId).name + ', ';
            }
          }
          lounge.airlines = airlinesString.slice(0, -2);
        }
      }
    },

    getFlagEmoji() {
      let charArray = this.airportData.location.countryA2.toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...charArray);
    }
  },
  async mounted() {
    await this.apiGETAirportById();
    this.getLoungeAirlines();

    map = L.map('airportMap')
      .setView([this.airportData.position.latitude, this.airportData.position.longitude], 7);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenSteetMap</a>'
    })
      .addTo(map);

    this.marker = L.marker([this.airportData.position.latitude, this.airportData.position.longitude], {icon: redIcon})
      .addTo(map);
  }
};
</script>

<style scoped>
.header-icon {
  cursor: pointer;
}
</style>
