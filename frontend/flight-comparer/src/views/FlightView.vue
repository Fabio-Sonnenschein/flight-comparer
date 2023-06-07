<template>
  <div class="flight-view-container">
    <div class="flight-view-header">
      <div class="flight-view-header--left">
        <RouterLink
            to="/"
            custom
            v-slot="{navigate}">
          <span class="header-icon icon" @click="navigate" role="link">arrow_back</span>
        </RouterLink>
        <div class="flight-view-title">
          <span class="flight-view-title--flight-number">{{ this.airlineData.code }} {{ this.flightData.number }}</span>
          <span class="flight-view-title--code">{{ this.departureAirportData.code }}</span>
          <span class="flight-view-title--text">{{ this.departureAirportData.location.city }}</span>
          <span class="icon flight-view-title--separator">flight</span>
          <span class="flight-view-title--code">{{ this.arrivalAirportData.code }}</span>
          <span class="flight-view-title--text">{{ this.arrivalAirportData.location.city }}</span>
        </div>
      </div>
      <div class="flight-view-header--right">
        <Button_Icon class="flight-view-header-action"
                     :options="{
                     id: 'deleteFlightButton',
                     icon: 'delete',
                     helper: 'Delete Flight'
                   }"
                     @clickAction="this.deleteFlight"/>
        <Button_Icon class="flight-view-header-action"
                     :options="{
                     id: 'saveFlightChangesButton',
                     icon: 'save',
                     helper: 'Save Changes'
                   }"
                     @clickAction="this.saveChanges"/>
      </div>
    </div>
    <div class="flight-view-content">
      <div class="flight-view-content-map">
        <div id="flightMap"></div>
      </div>
      <div class="flight-view-content-details" v-if="this.everythingLoaded">
        <div class="fvc-section-container">
          <h3 class="fvc-section-title">Departure</h3>
          <div class="fvc-section">
            <Select class=""
                    :options="{
                      data: this.airports,
                      id: 'fvc-departure-airport-input',
                      icon: '',
                      initialValue: this.departureAirportData._id,
                      valueVariable: '_id',
                      labelVariable: 'code',
                      label: 'Airport',
                      placeholder: 'Airport'
                    }"
                    @changeAction="async (inputId, value) => {
                      this.flightData.departure.airport = value;
                      this.departureAirportData = await this.apiGETAirportById(this.flightData.departure.airport);
                      this.updateMap();
                    }"/>
            <div></div>
            <div></div>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-departure-time-time-input',
                     initialValue: this.flightData.departure.time.time,
                     label: 'Time (local)',
                     placeholder: 'Time (local)'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.departure.time.time = value;}"/>

            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-departure-time-zone-input',
                     initialValue: this.flightData.departure.time.zone,
                     label: 'Time Zone',
                     placeholder: 'Time Zone'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.departure.time.zone = value;}"/>

            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-departure-time-utc-input',
                     initialValue: this.flightData.departure.time.utc,
                     label: 'Time (UTC)',
                     placeholder: 'Time (UTC)'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.departure.time.utc = value;}"/>
          </div>
        </div>
        <div class="fvc-section-container">
          <h3 class="fvc-section-title">Flight</h3>
          <div class="fvc-section">
            <Select class=""
                    :options="{
                      data: this.airlines,
                      id: 'fvc-airline-input',
                      icon: '',
                      initialValue: this.airlineData._id,
                      valueVariable: '_id',
                      labelVariable: 'name',
                      label: 'Airline',
                      placeholder: 'Airline'
                    }"
                    @changeAction="async (inputId, value) => {
                      this.flightData.airline = value;
                      this.airlineData = await this.apiGETAirlineById(this.flightData.airline);
                    }"/>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-flight-number-input',
                     initialValue: this.flightData.number,
                     label: 'Flight Number',
                     placeholder: 'Flight Number'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.number = value;}"/>
            <div></div>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-aircraft-input',
                     initialValue: this.flightData.aircraft,
                     label: 'Aircraft',
                     placeholder: 'Aircraft'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.aircraft = value;}"/>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-cabin-input',
                     initialValue: this.flightData.cabin,
                     label: 'Cabin',
                     placeholder: 'Cabin'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.cabin = value;}"/>
            <div></div>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'number',
                     min: 0,
                     icon: '',
                     id: 'fvc-duration-input',
                     initialValue: this.flightData.duration,
                     label: 'Duration',
                     placeholder: 'Duration'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.duration = value;}"/>
            <div class="select-list-option-selection-container--left fvc-select-box"
                 @click="this.flightData.overnight = !this.flightData.overnight">
              <span class="icon select-list-option-selection-icon">
                {{ this.flightData.overnight ? 'check' : '' }}
              </span>
              <p class="select-list-option-selection-label">
                Overnight
              </p>
            </div>
          </div>
        </div>
        <div class="fvc-section-container">
          <h3 class="fvc-section-title">Arrival</h3>
          <div class="fvc-section">
            <Select class=""
                    :options="{
                      data: this.airports,
                      id: 'fvc-arrival-airport-input',
                      icon: '',
                      initialValue: this.arrivalAirportData._id,
                      valueVariable: '_id',
                      labelVariable: 'code',
                      label: 'Airport',
                      placeholder: 'Airport'
                    }"
                    @changeAction="async (inputId, value) => {
                      this.flightData.arrival.airport = value;
                      this.arrivalAirportData = await this.apiGETAirportById(this.flightData.arrival.airport);
                      this.updateMap();
                    }"/>
            <div></div>
            <div></div>
            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-arrival-time-time-input',
                     initialValue: this.flightData.arrival.time.time,
                     label: 'Time (local)',
                     placeholder: 'Time (local)'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.arrival.time.time = value;}"/>

            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-arrival-time-zone-input',
                     initialValue: this.flightData.arrival.time.zone,
                     label: 'Time Zone',
                     placeholder: 'Time Zone'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.arrival.time.zone = value;}"/>

            <Input class="fvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'fvc-arrival-time-utc-input',
                     initialValue: this.flightData.arrival.time.utc,
                     label: 'Time (UTC)',
                     placeholder: 'Time (UTC)'
                   }"
                   @changeAction="(inputId, value) => {this.flightData.arrival.time.utc = value;}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet';
import Input from '@/components/inputs/text/Input.vue';
import Select_List from '@/components/inputs/selection/Select_List.vue';
import Select from '@/components/inputs/selection/Select.vue';
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';

let map;

const redIcon = L.icon({
  iconUrl: '../src/assets/airportMarker_red.svg',
  iconSize: [25, 31.06],
  iconAnchor: [12.5, 31]
});


export default {
  name: 'FlightView',
  components: {Button_Icon, Select, Select_List, Input},
  data: function () {
    return {
      flightData: {},
      airlineData: {},
      departureAirportData: {
        location: {}
      },
      arrivalAirportData: {
        location: {}
      },
      airports: [],
      airlines: [],
      departureMarker: undefined,
      arrivalMarker: undefined,
      flightPath: undefined,
      everythingLoaded: false
    };
  },
  methods: {
    async apiGETFlightById() {
      const request = await fetch('http://127.0.0.1:8080/flight/' + this.$route.params.flightId);
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async apiGETAirports() {
      const request = await fetch('http://127.0.0.1:8080/airport/all');
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async apiGETAirportById(airportId) {
      const request = await fetch('http://127.0.0.1:8080/airport/' + airportId);
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async apiGETAirlines() {
      const request = await fetch('http://127.0.0.1:8080/airline/all');
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async apiGETAirlineById(airlineId) {
      const request = await fetch('http://127.0.0.1:8080/airline/' + airlineId);
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    updateMap() {
      this.departureMarker.setLatLng(L.latLng(
          this.departureAirportData.position.latitude,
          this.departureAirportData.position.longitude
      ));
      this.arrivalMarker.setLatLng(L.latLng(
          this.arrivalAirportData.position.latitude,
          this.arrivalAirportData.position.longitude
      ));
      this.flightPath.setLatLngs([
        [this.departureAirportData.position.latitude, this.departureAirportData.position.longitude],
        [this.arrivalAirportData.position.latitude, this.arrivalAirportData.position.longitude]
      ]);

      map.fitBounds(L.latLngBounds(L.latLng(
          this.departureAirportData.position.latitude,
          this.departureAirportData.position.longitude
      ), L.latLng(
          this.arrivalAirportData.position.latitude,
          this.arrivalAirportData.position.longitude
      )));
    },

    async saveChanges() {
      const request = await fetch('http://127.0.0.1:8080/flight', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.flightData)
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();
      console.log(response);
    },

    async deleteFlight() {
      const request = await fetch('http://127.0.0.1:8080/flight/' + this.flightData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();
      console.log(response);

      this.$router.replace({path: '/'});
    }
  },
  async mounted() {
    this.flightData = await this.apiGETFlightById();
    this.airlineData = await this.apiGETAirlineById(this.flightData.airline);
    this.departureAirportData = await this.apiGETAirportById(this.flightData.departure.airport);
    this.arrivalAirportData = await this.apiGETAirportById(this.flightData.arrival.airport);
    this.airports = await this.apiGETAirports();
    this.airlines = await this.apiGETAirlines();

    this.everythingLoaded = true;

    map = L.map('flightMap')
        .setView([40.46814, -3.56865], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
        .addTo(map);

    this.departureMarker = L.marker([
      this.departureAirportData.position.latitude,
      this.departureAirportData.position.longitude
    ], {icon: redIcon})
        .addTo(map);
    this.arrivalMarker = L.marker([
      this.arrivalAirportData.position.latitude,
      this.arrivalAirportData.position.longitude
    ], {icon: redIcon})
        .addTo(map);
    let connectedDots = [
      [this.departureAirportData.position.latitude, this.departureAirportData.position.longitude],
      [this.arrivalAirportData.position.latitude, this.arrivalAirportData.position.longitude]
    ];
    this.flightPath = L.polyline(connectedDots, {color: 'var(--color-accent-red)'})
        .addTo(map);

    this.updateMap();
  }
};
</script>

<style scoped>
.flight-view-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.25rem;
  overflow: hidden;
}

.flight-view-header {
  position: fixed;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 2rem;
  height: 3.125rem;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  box-shadow: 0 0 10px 0 var(--color-background-least);
}

.flight-view-header--left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.header-icon {
  font-size: 2rem;
  line-height: 2rem;
  margin: 0 2rem 0 0;
  cursor: pointer;
}

.flight-view-title {
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flight-view-title--flight-number {
  line-height: 2rem;
  margin-right: 2rem;
  font-weight: 600;
}

.flight-view-title--code {
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 600;
  padding: .5rem;
  background: var(--color-background-less);
  border-radius: .25rem;
}

.flight-view-title--text {
  font-weight: 200;
  margin-left: .75rem;
  line-height: 2rem;
}

.flight-view-title--separator {
  rotate: 90deg;
  font-size: 1.75rem;
  margin: 0 2rem;
}

.flight-view-header--right {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.flight-view-header-action {
  background: var(--color-background-less);
  margin-right: 2rem;
}

.flight-view-header-action:last-of-type {
  margin-right: 0;
}

.flight-view-content {
  position: absolute;
  top: 11rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.flight-view-content-map {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#flightMap {
  height: 100%;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 10px -7px var(--color-background-least);
}

.flight-view-content-details {
  background: var(--color-background);
  border-radius: 16px;
  overflow: auto;
  margin: 2rem 0 0 0;
  box-shadow: 0 0 10px 0 var(--color-background-least);
}

.fvc-section-title {
  margin: 0;
  font-size: 1.8rem;
  line-height: 2.5rem;
  padding: 2rem;
  text-transform: uppercase;
  letter-spacing: .15rem;
  position: sticky;
  top: 0;
  background: var(--color-background);
  box-shadow: 0 0 200px 0 var(--color-background-69);
  z-index: 200;
}

.fvc-section {
  padding: 2rem;
  background: var(--color-background-less);
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 2rem;
  column-gap: 2rem;
  align-items: flex-start;
  justify-content: center;
}

.fvc-select-box {
  margin-top: 1rem;
}
</style>
