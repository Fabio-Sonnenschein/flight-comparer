<template>
  <div class="trip-view-container">
    <div class="trip-view-header">
      <div class="trip-view-header--left">
        <RouterLink
            to="/"
            custom
            v-slot="{navigate}">
          <span class="header-icon icon" @click="navigate" role="link">arrow_back</span>
        </RouterLink>
        <div class="trip-view-title">
          <span class="trip-view-title--trip-number">{{ this.tripData.name }}</span>
        </div>
      </div>
      <div class="trip-view-header--right">
        <Button_Icon class="trip-view-header-action"
                     :options="{
                     id: 'deleteTripButton',
                     icon: 'delete',
                     helper: 'Delete Trip'
                   }"
                     @clickAction="this.deleteTrip"/>
        <Button_Icon class="trip-view-header-action"
                     :options="{
                     id: 'savetripChangesButton',
                     icon: 'save',
                     helper: 'Save Changes'
                   }"
                     @clickAction="this.saveChanges"/>
      </div>
    </div>
    <div class="trip-view-content">
      <div class="trip-view-content-map">
        <div id="tripMap"></div>
      </div>
      <div class="trip-view-content-details" v-if="this.everythingLoaded">
        <div class="tvc-section-container">
          <h3 class="tvc-section-title">Details</h3>
          <div class="tvc-section">
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'tvc-name',
                     initialValue: this.tripData.name,
                     label: 'Name',
                     placeholder: 'Name'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.name = value;}"/>
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'tvc-description',
                     initialValue: this.tripData.description,
                     label: 'Description',
                     placeholder: 'Description'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.description = value;}"/>
            <div class="select-list-option-selection-container--left tvc-select-box"
                 @click="this.tripData.roundTrip = !this.tripData.roundTrip">
              <span class="icon select-list-option-selection-icon">
                {{ this.tripData.roundTrip ? 'check' : '' }}
              </span>
              <p class="select-list-option-selection-label">
                Round Trip
              </p>
            </div>
          </div>
        </div>
        <div class="tvc-section-container">
          <h3 class="tvc-section-title">Flights</h3>
          <div class="tvc-section">
            <div class="tvc-flight" v-for="flightIndex in (this.tripData.flights.length)">
              <Select class=""
                      :options="{
                        data: this.flights,
                        id: 'tvc-flights---' + (flightIndex - 1),
                        icon: '',
                        initialValue: this.tripData.flights[flightIndex - 1],
                        valueVariable: '_id',
                        labelVariable: 'name',
                        label: 'Flight',
                        placeholder: 'Flight'
                      }"
                      @changeAction="async (inputId, value) => {
                        this.tripData.flights[flightIndex - 1] = value;
                        this.updateMap();
                      }"/>
              <Button_Extend class=""
                             :options="{
                               id: 'tvc-remove-flight---' + (flightIndex - 1),
                               icon: 'do_not_disturb_on',
                               helper: 'Remove flight',
                               text: 'Remove flight'
                             }"
                             @clickAction="() => {
                               this.removeFlight(flightIndex);
                               this.updateMap();
                             }"/>
            </div>
            <Button_Text class=""
                         :options="{
                           id: 'tvc-add-flight',
                           helper: 'Add flight',
                           text: 'Add flight'
                         }"
                         @clickAction="() => {
                           this.tripData.flights.push(this.flights[0]._id);
                           this.updateMap();
                         }"/>
          </div>
        </div>
        <div class="tvc-section-container">
          <h3 class="tvc-section-title">Booking Details</h3>
          <div class="tvc-section">
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'tvc-vendor',
                     initialValue: this.tripData.vendor,
                     label: 'Vendor',
                     placeholder: 'Vendor'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.vendor = value;}"/>
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'tvc-link',
                     initialValue: this.tripData.link,
                     label: 'Link',
                     placeholder: 'Link'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.link = value;}"/>
            <div></div>
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'number',
                     min: 0,
                     step: 0.01,
                     icon: '',
                     id: 'tvc-cost-price',
                     initialValue: this.tripData.cost.price,
                     label: 'Price',
                     placeholder: 'Price'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.cost.price = value;}"/>
            <Input class="tvc-input"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'tvc-cost-currency',
                     initialValue: this.tripData.cost.currency,
                     label: 'Currency',
                     placeholder: 'Currency'
                   }"
                   @changeAction="(inputId, value) => {this.tripData.cost.currency = value;}"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';
import Select from '@/components/inputs/selection/Select.vue';
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';
import L from 'leaflet';
import Button_Text from '@/components/inputs/button/Button_Text.vue';
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

let map;

const redIcon = L.icon({
  iconUrl: '../src/assets/airportMarker_red.svg',
  iconSize: [25, 31.06],
  iconAnchor: [12.5, 31]
});

export default {
  name: 'TripView',
  components: {Button_Extend, Button_Text, Button_Icon, Select, Input},
  data: function () {
    return {
      tripData: {},
      flights: [],
      airports: new Map(),
      airlines: new Map(),
      everythingLoaded: false,
      flightPath: undefined
    };
  },
  methods: {
    async apiGETTripById(tripId) {
      const request = await fetch('http://127.0.0.1:8080/trip/' + tripId);
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

    async apiGETAirports() {
      const request = await fetch('http://127.0.0.1:8080/airport/all');
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    async apiGETFlights() {
      const request = await fetch('http://127.0.0.1:8080/flight/all');
      if (!request.ok) {
        console.error(request.text());
      }
      return await request.json();
    },

    removeFlight(flightIndex) {
      let newFlightArray = [];
      for (let flightI = 0; flightI < this.tripData.flights.length; flightI++) {
        if (flightI !== (flightIndex - 1)) {
          newFlightArray.push(this.tripData.flights[flightI]);
        }
      }
      this.tripData.flights = newFlightArray;
    },

    updateMap() {
      let flightPathLatLngs = [];
      for (let flightId of this.tripData.flights) {
        for (let flightIndex in this.flights) {
          if (this.flights[flightIndex]._id === flightId) {
            flightPathLatLngs.push(L.latLng(
                this.flights[flightIndex].departure.airport.position.latitude,
                this.flights[flightIndex].departure.airport.position.longitude
            ));
            flightPathLatLngs.push(L.latLng(
                this.flights[flightIndex].arrival.airport.position.latitude,
                this.flights[flightIndex].arrival.airport.position.longitude
            ));
          }
        }
      }
      if (flightPathLatLngs.length > 0) {
        this.flightPath.setLatLngs(flightPathLatLngs);
        map.fitBounds(L.latLngBounds(flightPathLatLngs));
      }
    },

    async deleteTrip() {
      const request = await fetch('http://127.0.0.1:8080/trip/' + this.tripData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();
      console.log(response);

      this.$router.replace({path: '/'});
    },

    async saveChanges() {
      let airlineList = [];
      for (let flightId of this.tripData.flights) {
        for (let flight of this.flights) {
          if (flight._id === flightId) {
            airlineList.push(flight.airline._id);
          }
        }
      }
      this.tripData.airlines = airlineList;
      if (this.$route.params.tripId !== 'new') {
        const request = await fetch('http://127.0.0.1:8080/trip', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.tripData)
        });

        if (!request.ok) {
          console.error(request.text());
        }
        const response = await request.json();
      } else {
        const request = await fetch('http://127.0.0.1:8080/trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.tripData)
        });

        if (!request.ok) {
          console.error(request.text());
        }
        const response = await request.json();
        this.$router.replace({name: 'trip', params: {tripId: response.InsertedID}});
      }
    }
  },
  async mounted() {
    if (this.$route.params.tripId !== 'new') {
      this.tripData = await this.apiGETTripById(this.$route.params.tripId);
    } else {
      this.tripData = {
        airlines: [],
        cost: {
          currency: '',
          price: 0
        },
        description: '',
        flights: [],
        link: '',
        name: '',
        roundTrip: true,
        vendor: ''
      };
    }
    let airlineList = await this.apiGETAirlines();
    for (let airline of airlineList) {
      this.airlines.set(airline._id, airline);
    }
    let airportList = await this.apiGETAirports();
    for (let airport of airportList) {
      this.airports.set(airport._id, airport);
    }
    this.flights = await this.apiGETFlights();
    for (let flight of this.flights) {
      flight.airline = this.airlines.get(flight.airline);
      flight.name = flight.airline.code + ' ' + flight.number;
      flight.departure.airport = this.airports.get(flight.departure.airport);
      flight.arrival.airport = this.airports.get(flight.arrival.airport);
    }

    this.everythingLoaded = true;

    map = L.map('tripMap')
        .setView([40.46814, -3.56865], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
        .addTo(map);

    this.flightPath = L.polyline([], {color: 'var(--color-accent-red)'})
        .addTo(map);

    this.updateMap();
  }
};
</script>

<style scoped>
.trip-view-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.25rem;
  overflow: hidden;
}

.trip-view-header {
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

.trip-view-header--left {
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

.trip-view-title {
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.trip-view-title--trip-number {
  line-height: 2rem;
  margin-right: 2rem;
  font-weight: 600;
}

.trip-view-header--right {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.trip-view-header-action {
  background: var(--color-background-less);
  margin-right: 2rem;
}

.trip-view-header-action:last-of-type {
  margin-right: 0;
}

.trip-view-content {
  position: absolute;
  top: 11rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.trip-view-content-map {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#tripMap {
  height: 100%;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 10px -7px var(--color-background-least);
}

.trip-view-content-details {
  background: var(--color-background);
  border-radius: 16px;
  overflow: auto;
  margin: 2rem 0 0 0;
  box-shadow: 0 0 10px 0 var(--color-background-least);
}

.tvc-section-title {
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

.tvc-section {
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

.tvc-flight {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.tvc-flight .input-container--select {
  width: auto;
  flex-grow: 2;
}

.tvc-flight .button-container--extend {
  margin-left: 1rem;
  border: 1px solid var(--color-background)
}

.tvc-select-box {
  margin-top: 1rem;
}
</style>
