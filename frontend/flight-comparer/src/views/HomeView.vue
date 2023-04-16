<template>
  <div class="view-root">
    <div class="action-pane">
      <div class="action-container">
        <div class="search-container">
          <div class="search-input-container">
            <span class="icon search-icon">search</span>
            <input
                  type="text"
                  class="input input--text search-input"
                  id="search-input"
                  placeholder="Search for an airport or flight"
                  v-model="searchQuery"
                  @input="search">
            <span class="icon search-clear-icon" @click="clearSearch" v-if="this.searchQuery !== ''">clear</span>
          </div>
          <div class="search-output">
            <div class="search-tab-selector-container">
              <div class="search-tab-selector" @click="selectSearchTab('search')"
                   :class="[searchTabSelected.search ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">search</span>
                <span class="search-tab-selector-text">Results</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab('airports')"
                   :class="[searchTabSelected.airports ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">location_on</span>
                <span class="search-tab-selector-text">Airports</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab('flights')"
                   :class="[searchTabSelected.flights ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">airplane_ticket</span>
                <span class="search-tab-selector-text">Flights</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab('trips')"
                   :class="[searchTabSelected.trips ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">explore</span>
                <span class="search-tab-selector-text">Trips</span>
              </div>
            </div>
            <div class="search-tab-container">
              <div class="search-tab" id="search-tab-search"
                   :class="[searchTabSelected.search ? 'search-tab--selected' : '']">
                <div class="search-tab--empty">
                  <span class="icon">search</span>
                  <p>Try entering something in the search field above. The results will appear here.</p>
                </div>
              </div>
              <div class="search-tab" id="search-tab-airports"
                   :class="[searchTabSelected.airports ? 'search-tab--selected' : '']">
                <div class="search-tab--empty" v-if="this.airports.size <= 0">
                  <span class="icon">location_on</span>
                  <p>Oh, it seems like there are no known airports saved on our end. Sorry about that.</p>
                </div>
                <div v-for="airport in this.airports" v-if="this.airports.size > 0">
                  <SearchElement_Airport
                        v-if="airport[1].appearsInSearch"
                        :airport-data="this.getAirportData(airport)"
                        @click="this.airportSelected(this.getAirportData(airport).airportId)" />
                </div>
              </div>
              <div class="search-tab" id="search-tab-flights"
                   :class="[searchTabSelected.flights ? 'search-tab--selected' : '']">
                <div class="search-tab--empty" v-if="this.flights.size <= 0">
                  <span class="icon">airplane_ticket</span>
                  <p>It seems like you haven't entered any flights yet. Try adding a new flight with the button
                    below.</p>
                </div>
                <div v-for="flight in this.flights" v-if="this.flights.size > 0">
                  <SearchElement_Flight
                        v-if="flight[1].appearsInSearch"
                        :flight-data="this.getFlightData(flight)"
                        @click="this.flightSelected(this.getFlightData(flight).flightId)" />
                </div>
              </div>
              <div class="search-tab" id="search-tab-trips"
                   :class="[searchTabSelected.trips ? 'search-tab--selected' : '']">
                <div class="search-tab--empty">
                  <span class="icon">explore</span>
                  <p>It seems like you haven't created any trips yet. Try creating a new trip with the button below.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="action">
          <span class="icon action-icon">airplane_ticket</span>
          <p class="action-text">Add a Flight</p>
        </div>
        <div class="action">
          <span class="icon action-icon">explore</span>
          <p class="action-text">Create a Trip</p>
        </div>
        <RouterLink
              to="/about"
              custom
              v-slot="{ navigate }">
          <div class="action" @click="navigate" role="link">
            <span class="icon action-icon">info</span>
            <p class="action-text">About Flight Comparer</p>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="home-container">
      <div class="map-container">
        <div id="map"></div>
      </div>
      <div class="detail-container">
        <div class="detail-container--empty" v-if="showMapDetails === this.SHOW_DETAILS__NONE">
          <span class="icon">location_on</span>
          <p>Try selecting something on the map above or from the list on the left side to see more details.</p>
        </div>
        <MapSelection_Airport
              :airportData="this.airportData"
              v-if="showMapDetails === this.SHOW_DETAILS__AIRPORT" />
        <MapSelection_Flight
              :flightData="this.flightData"
              v-if="showMapDetails === this.SHOW_DETAILS__FLIGHT" />
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';
import ErrorComponent from '@/components/Error.vue';
import SearchElement_Airport from '@/components/SearchElement_Airport.vue';
import SearchElement_Flight from '@/components/SearchElement_Flight.vue';
import L from 'leaflet';
import MapSelection_Flight from '@/components/MapSelection_Flight.vue';

const MapSelection_Airport = defineAsyncComponent({
  loader: () => import('@/components/MapSelection_Airport.vue'),
  errorComponent: ErrorComponent,
  onError(error, retry, fail, attempts) {
    console.warn(attempts);
    console.error(error);
    fail();
  }
});

let map;

const blueIcon = L.icon({
  iconUrl: 'src/assets/airportMarker_blue.svg',
  iconSize: [25, 31.06],
  iconAnchor: [12.5, 31]
});

const redIcon = L.icon({
  iconUrl: 'src/assets/airportMarker_red.svg',
  iconSize: [25, 31.06],
  iconAnchor: [12.5, 31]
});

export default {
  components: {
    MapSelection_Flight,
    SearchElement_Flight,
    SearchElement_Airport,
    MapSelection_Airport
  },
  data: function () {
    return {
      searchTabSelected: {
        search: false,
        airports: true,
        flights: false,
        trips: false
      },
      SHOW_DETAILS__NONE: 'none',
      SHOW_DETAILS__AIRPORT: 'airport',
      SHOW_DETAILS__FLIGHT: 'flight',
      blueIcon: L.Icon,
      searchQuery: '',
      airports: new Map(),
      airportMarkers: new Map(),
      flights: new Map(),
      flightLines: new Map(),
      airlines: new Map(),
      showMapDetails: 'none',
      selectedAirportMarkers: [],
      selectedFlightLines: [],
      airportData: {
        airportId: '',
        airportCode: '',
        airportName: '',
        airportCity: '',
        airportCountry: '',
        airportCountryA2: ''
      },
      flightData: {}
    };
  },
  methods: {
    search() {
      for (let airport of this.airports) {
        airport[1].appearsInSearch = true;
      }
      let query = this.searchQuery.replace(/\s/g, '')
        .toLowerCase();
      if (query.includes(':')) {
        let split = query.split(':');
        switch (split[0]) {
          case 'code':
            if (!this.searchTabSelected.airports) {
              this.selectSearchTab('airports');
            }
            let codeQuery = split[1];
            for (let airport of this.airports) {
              if (!airport[1].code.toLowerCase()
                .includes(codeQuery)) {
                airport[1].appearsInSearch = false;
              }
            }
            this.hideAirports();
            this.displayAirports();
            break;
          case 'flight':
            if (!this.searchTabSelected.flights) {
              this.selectSearchTab('flights');
            }
            console.log(split[1]);
            break;
          case 'trip':
            if (!this.searchTabSelected.trips) {
              this.selectSearchTab('trips');
            }
            console.log(split[1]);
            break;
          default:
            if (!this.searchTabSelected.search) {
              this.selectSearchTab('search');
            }
            console.log(split[0] + ':' + split[1]);
        }
      } else {
        if (!this.searchTabSelected.search) {
          this.selectSearchTab('search');
        }
        console.log(query);
      }
    },

    clearSearch() {
      this.searchQuery = '';
      for (let airport of this.airports) {
        airport[1].appearsInSearch = true;
      }
      this.displayAirports();
    },

    selectSearchTab(tabName) {
      switch (tabName) {
        case 'search':
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.search = true;
          break;
        case 'airports':
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.airports = true;
          break;
        case 'flights':
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.flights = true;
          break;
        case 'trips':
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.trips = true;
          break;
        default:
          break;
      }
    },

    async apiGETFlights() {
      const request = await fetch('http://127.0.0.1:8080/flight/all');
      if (!request.ok) {
        console.error(request.text());
      }
      const flightList = await request.json();
      for (let flight of flightList) {
        flight.appearsInSearch = true;
        flight.airline = this.airlines.get(flight.airline);
        flight.departure.airport = this.airports.get(flight.departure.airport);
        flight.arrival.airport = this.airports.get(flight.arrival.airport);
        this.flights.set(flight._id, flight);
      }
      this.createFlightLines();
    },

    async apiGETAirlines() {
      const request = await fetch('http://127.0.0.1:8080/airline/all');
      if (!request.ok) {
        console.error(request.text());
      }
      const airlineList = await request.json();
      for (let airline of airlineList) {
        this.airlines.set(airline._id, airline);
      }
    },

    async apiGETAirports() {
      const request = await fetch('http://127.0.0.1:8080/airport/all');
      if (!request.ok) {
        console.error(request.text());
      }
      const airportList = await request.json();
      for (let airport of airportList) {
        airport.appearsInSearch = true;
        this.airports.set(airport._id, airport);
      }
      this.createAirportMarkers();
    },

    createFlightLines() {
      for (let flight of this.flights) {
        let connectedDots = [
          [flight[1].departure.airport.position.latitude, flight[1].departure.airport.position.longitude],
          [flight[1].arrival.airport.position.latitude, flight[1].arrival.airport.position.longitude]
        ];
        let polyline = L.polyline(connectedDots, {color: 'var(--color-accent-blue)'}).addTo(map);
        polyline.on('click', () => {
          this.flightSelected(flight[0]);
        });
        this.flightLines.set(flight[0], polyline);
      }
    },

    createAirportMarkers() {
      for (let airport of this.airports) {
        let marker = L.marker([airport[1].position.latitude, airport[1].position.longitude], {icon: blueIcon})
          .addTo(map);

        marker.on('click', () => {
          this.airportSelected(airport[0]);
        });
        this.airportMarkers.set(airport[0], marker);
      }
    },

    displayAirports() {
      for (let airport of this.airports) {
        if (airport[1].appearsInSearch) {
          this.airportMarkers.get(airport[0])
            .setOpacity(1);
        }
      }
    },

    hideAirports() {
      for (let marker of this.airportMarkers) {
        marker[1].setOpacity(0);
      }
    },

    // getAirportData expects an airports map entry of the form [airportId, airportData]
    getAirportData(airport) {
      let airportId = airport[0];
      airport = airport[1];
      return {
        airportId: airportId,
        airportCode: airport.code,
        airportName: airport.name,
        airportCity: airport.location.city,
        airportCountry: airport.location.country,
        airportCountryA2: airport.location.countryA2
      };
    },

    // getFlightData expects a flights map entry of the form [flightId, flightData]
    getFlightData(flight) {
      let flightId = flight[0];
      flight = flight[1];
      return {
        flightId: flightId,
        flightNumber: flight.airline.code + ' ' + flight.number.toString(),
        departure: flight.departure,
        arrival: flight.arrival,
        duration: flight.duration,
        overnight: flight.overnight,
        airline: flight.airline,
        aircraft: flight.aircraft,
        cabin: flight.cabin
      };
    },

    airportSelected(airportId) {
      this.mapDetailsDeSelect();
      let selectedAirportMarker = this.airportMarkers.get(airportId);
      selectedAirportMarker.setIcon(redIcon);
      this.selectedAirportMarkers.push(selectedAirportMarker);
      this.showMapDetails = this.SHOW_DETAILS__AIRPORT;
      // this.airports.get(airportId) only returns the data part of the map entry
      // however, this.getAirportData expects an entire map entry, not just the data part
      // therefore, the parameter re-includes the airportId
      this.airportData = this.getAirportData([airportId, this.airports.get(airportId)]);
    },

    airportDeSelect() {
      for (let selectedAirportMarker of this.selectedAirportMarkers) {
        selectedAirportMarker.setIcon(blueIcon);
      }
      this.selectedAirportMarkers = [];
    },

    flightSelected(flightId) {
      this.mapDetailsDeSelect();
      let selectedFlightLine = this.flightLines.get(flightId);
      selectedFlightLine.setStyle({color: 'var(--color-accent-red)'});
      this.selectedFlightLines.push(selectedFlightLine);
      let selectedAirportMarker = this.airportMarkers.get(this.flights.get(flightId).departure.airport._id);
      selectedAirportMarker.setIcon(redIcon);
      this.selectedAirportMarkers.push(selectedAirportMarker);
      selectedAirportMarker = this.airportMarkers.get(this.flights.get(flightId).arrival.airport._id);
      selectedAirportMarker.setIcon(redIcon);
      this.selectedAirportMarkers.push(selectedAirportMarker);
      this.showMapDetails = this.SHOW_DETAILS__FLIGHT;
      // this.flights.get(airportId) only returns the data part of the map entry,
      // however, this.getFlightData expects an entire map entry, not just the data part
      // therefore, the parameter re-includes the flightId
      this.flightData = this.getFlightData([flightId, this.flights.get(flightId)]);
    },

    flightDeSelect() {
      for (let selectedFlightLine of this.selectedFlightLines) {
        selectedFlightLine.setStyle({color: 'var(--color-accent-blue)'});
      }
      this.selectedFlightLines = [];
    },

    mapDetailsDeSelect() {
      this.airportDeSelect();
      this.flightDeSelect();
    }
  },
  async mounted() {
    map = L.map('map')
      .setView([23.725011735951796, 13.0078125], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
      .addTo(map);

    await this.apiGETAirports();
    await this.apiGETAirlines();
    await this.apiGETFlights();
  },
  setup() {
  }
};
</script>

<style scoped>
.search-container {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
}

.search-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--color-background-less);
  border-radius: .5rem;
}

.search-icon {
  margin: 1rem;
}

.search-input {
  background: transparent;
  border: none;
  flex-grow: 2;
  padding-right: 1rem;
  height: 100%;
  outline: none;
  font-size: 1.3rem;
  color: var(--color-text);
  border-radius: .5rem;
}

.search-clear-icon {
  margin: 1rem 1rem 1rem 0;
  cursor: pointer;
}

.search-output {
  flex-grow: 4;
  padding: 1rem 0 2rem;
  display: flex;
  flex-direction: column;
}

.search-tab-selector-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
}

.search-tab-selector {
  width: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  outline: none;
  cursor: pointer;
  position: relative;
}

.search-tab-selector:hover .search-tab-selector-icon {
  margin-bottom: 2.25rem;
}

.search-tab-selector:hover .search-tab-selector-text {
  top: 1.75rem;
  opacity: 1;
}

.search-tab-selector--selected {
  border-bottom: 2px solid var(--color-text);
}

.search-tab-selector-icon {
  cursor: pointer;
  margin-bottom: .75rem;
  transition: .2s;
}

.search-tab-selector-text {
  position: absolute;
  top: 1.25rem;
  text-align: center;
  opacity: 0;
  transition: .3s;
}

.search-tab-container {
  margin-top: 1rem;
  height: 100%;
  position: relative;
}

.search-tab {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  overflow: auto;
}

.search-tab--selected {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.search-tab--empty {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
}

.search-tab--empty .icon {
  font-size: 3rem;
  line-height: 3rem;
}

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

.detail-container--empty {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-container--empty .icon {
  font-size: 3rem;
  line-height: 3rem;
}
</style>
