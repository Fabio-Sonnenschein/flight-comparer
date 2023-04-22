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
          <div class="search-error-container" v-if="this.searchError">
            <p v-if="this.searchErrors.TooManySpecifications">Sorry, currently there is only one search specification
              supported.<br>(Try for example "city: Brisbane")</p>
          </div>
          <div class="search-output">
            <div class="search-tab-selector-container">
              <div class="search-tab-selector" @click="selectSearchTab(this.SEARCH_TAB__SEARCH)"
                   :class="[searchTabSelected.search ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">search</span>
                <span class="search-tab-selector-text">Results</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab(this.SEARCH_TAB__AIRPORT)"
                   :class="[searchTabSelected.airport ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">location_on</span>
                <span class="search-tab-selector-text">Airports</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab(this.SEARCH_TAB__FLIGHT)"
                   :class="[searchTabSelected.flight ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">airplane_ticket</span>
                <span class="search-tab-selector-text">Flights</span>
              </div>
              <div class="search-tab-selector" @click="selectSearchTab(this.SEARCH_TAB__TRIP)"
                   :class="[searchTabSelected.trip ? 'search-tab-selector--selected' : '']">
                <span class="search-tab-selector-icon icon">explore</span>
                <span class="search-tab-selector-text">Trips</span>
              </div>
            </div>
            <div class="search-tab-container">
              <div class="search-tab" id="search-tab-search"
                   :class="[searchTabSelected.search ? 'search-tab--selected' : '']">
                <div class="search-tab--empty" v-if="this.displaySearchHint">
                  <span class="icon">search</span>
                  <p>Try entering something in the search field above. The results will appear here.</p>
                </div>
                <div v-for="airport in this.airports" v-if="this.airports.size > 0">
                  <SearchElement_Airport
                        v-if="airport[1].appearsInSearch"
                        :airport-data="this.getAirportData(airport)"
                        @click="this.airportSelected(this.getAirportData(airport).airportId)"/>
                </div>
                <div v-for="flight in this.flights" v-if="this.flights.size > 0">
                  <SearchElement_Flight
                        v-if="flight[1].appearsInSearch"
                        :flight-data="this.getFlightData(flight)"
                        @click="this.flightSelected(this.getFlightData(flight).flightId)"/>
                </div>
              </div>
              <div class="search-tab" id="search-tab-airports"
                   :class="[searchTabSelected.airport ? 'search-tab--selected' : '']">
                <div class="search-tab--empty" v-if="this.airports.size <= 0">
                  <span class="icon">location_on</span>
                  <p>Oh, it seems like there are no known airports saved on our end. Sorry about that.</p>
                </div>
                <div v-for="airport in this.airports" v-if="this.airports.size > 0">
                  <SearchElement_Airport
                        v-if="airport[1].appearsInSearch"
                        :airport-data="this.getAirportData(airport)"
                        @click="this.airportSelected(this.getAirportData(airport).airportId)"/>
                </div>
              </div>
              <div class="search-tab" id="search-tab-flights"
                   :class="[searchTabSelected.flight ? 'search-tab--selected' : '']">
                <div class="search-tab--empty" v-if="this.flights.size <= 0">
                  <span class="icon">airplane_ticket</span>
                  <p>It seems like you haven't entered any flights yet. Try adding a new flight with the button
                    below.</p>
                </div>
                <div v-for="flight in this.flights" v-if="this.flights.size > 0">
                  <SearchElement_Flight
                        v-if="flight[1].appearsInSearch"
                        :flight-data="this.getFlightData(flight)"
                        @click="this.flightSelected(this.getFlightData(flight).flightId)"/>
                </div>
              </div>
              <div class="search-tab" id="search-tab-trips"
                   :class="[searchTabSelected.trip ? 'search-tab--selected' : '']">
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
              to="/preferences"
              custom
              v-slot="{ navigate }">
          <div class="action" @click="navigate" role="link">
            <span class="icon action-icon">settings</span>
            <p class="action-text">Preferences</p>
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
              v-if="showMapDetails === this.SHOW_DETAILS__AIRPORT"/>
        <MapSelection_Flight
              :flightData="this.flightData"
              v-if="showMapDetails === this.SHOW_DETAILS__FLIGHT"/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchElement_Airport from '@/components/SearchElement_Airport.vue';
import SearchElement_Flight from '@/components/SearchElement_Flight.vue';
import MapSelection_Airport from '@/components/MapSelection_Airport.vue';
import MapSelection_Flight from '@/components/MapSelection_Flight.vue';
import L from 'leaflet';

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
        airport: true,
        flight: false,
        trip: false
      },
      SEARCH_TAB__SEARCH: 'search',
      SEARCH_TAB__AIRPORT: 'airport',
      SEARCH_TAB__FLIGHT: 'flight',
      SEARCH_TAB__TRIP: 'trip',
      searchQuery: '',
      displaySearchHint: true,
      searchError: false,
      searchErrors: {
        TooManySpecifications: false
      },
      SHOW_DETAILS__NONE: 'none',
      SHOW_DETAILS__AIRPORT: 'airport',
      SHOW_DETAILS__FLIGHT: 'flight',
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
      if (this.displaySearchHint) {
        this.displaySearchHint = false;
      }
      for (let airport of this.airports) {
        airport[1].appearsInSearch = true;
      }
      this.displayAirports();
      for (let flight of this.flights) {
        flight[1].appearsInSearch = true;
      }
      this.displayFlights();
      let query = this.searchQuery.replace(/\s/g, '')
        .toLowerCase();
      if (query.includes(':')) {
        let split = query.split(':');
        this.searchErrors.TooManySpecifications = (split.length > 2);
        this.determineSearchErrorState();
        switch (split[0]) {
          case 'code':
            if (!this.searchTabSelected.airport) {
              this.selectSearchTab(this.SEARCH_TAB__AIRPORT);
            }
            for (let flight of this.flights) {
              flight[1].appearsInSearch = false;
            }
            this.hideFlights();
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
          case 'number':
            if (!this.searchTabSelected.flight) {
              this.selectSearchTab(this.SEARCH_TAB__FLIGHT);
            }
            for (let airport of this.airports) {
              airport[1].appearsInSearch = false;
            }
            this.hideAirports();
            let numberQuery = split[1];
            for (let flight of this.flights) {
              if (!(flight[1].airline.code + flight[1].number.toString()).toLowerCase()
                .includes(numberQuery)) {
                flight[1].appearsInSearch = false;
              }
            }
            this.hideFlights();
            this.displayFlights();
            break;
          case 'city':
            if (!this.searchTabSelected.search) {
              this.selectSearchTab(this.SEARCH_TAB__SEARCH);
            }
            let cityQuery = split[1];
            for (let airport of this.airports) {
              if (!airport[1].location.city.replace(/\s/g, '')
                .toLowerCase()
                .includes(cityQuery)) {
                airport[1].appearsInSearch = false;
              }
            }
            this.hideAirports();
            this.displayAirports();
            for (let flight of this.flights) {
              if (!flight[1].departure.airport.location.city.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(cityQuery) &&
                  !flight[1].arrival.airport.location.city.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(cityQuery)) {
                flight[1].appearsInSearch = false;
              }
            }
            this.hideFlights();
            this.displayFlights();
            break;
          case 'country':
            if (!this.searchTabSelected.search) {
              this.selectSearchTab(this.SEARCH_TAB__SEARCH);
            }
            let countryQuery = split[1];
            for (let airport of this.airports) {
              if (!airport[1].location.country.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery) &&
                  !airport[1].location.countryA2.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery)) {
                airport[1].appearsInSearch = false;
              }
            }
            this.hideAirports();
            this.displayAirports();
            for (let flight of this.flights) {
              if (!flight[1].departure.airport.location.country.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery) &&
                  !flight[1].departure.airport.location.countryA2.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery) &&
                  !flight[1].arrival.airport.location.country.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery) &&
                  !flight[1].arrival.airport.location.countryA2.replace(/\s/g, '')
                    .toLowerCase()
                    .includes(countryQuery)) {
                flight[1].appearsInSearch = false;
              }
            }
            this.hideFlights();
            this.displayFlights();
            break;
          case 'airline':
            if (!this.searchTabSelected.search) {
              this.selectSearchTab(this.SEARCH_TAB__SEARCH);
            }
            for (let airport of this.airports) {
              airport[1].appearsInSearch = false;
            }
            this.hideAirports();
            let airlineQuery = split[1];
            for (let flight of this.flights) {
              if (!flight[1].airline.code.toLowerCase()
                    .includes(airlineQuery) &&
                  !flight[1].airline.name.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(airlineQuery)) {
                flight[1].appearsInSearch = false;
              }
            }
            this.hideFlights();
            this.displayFlights();
            break;
          case 'airport':
            if (!this.searchTabSelected.search) {
              this.selectSearchTab(this.SEARCH_TAB__SEARCH);
            }
            for (let flight of this.flights) {
              flight[1].appearsInSearch = false;
            }
            this.hideFlights();
            let airportQuery = split[1];
            for (let airport of this.airports) {
              if (!airport[1].code.toLowerCase()
                    .includes(airportQuery) &&
                  !airport[1].name.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(airportQuery) &&
                  !airport[1].location.city.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(airportQuery)) {
                airport[1].appearsInSearch = false;
              }
            }
            this.hideAirports();
            this.displayAirports();
            break;
          case 'flight':
            if (!this.searchTabSelected.flight) {
              this.selectSearchTab(this.SEARCH_TAB__FLIGHT);
            }
            for (let airport of this.airports) {
              airport[1].appearsInSearch = false;
            }
            this.hideAirports();
            let flightQuery = split[1];
            for (let flight of this.flights) {
              if (!flight[1].airline.code.toLowerCase()
                    .includes(flightQuery) &&
                  !flight[1].airline.name.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(flightQuery) &&
                  !flight[1].departure.airport.code.toLowerCase()
                    .includes(flightQuery) &&
                  !flight[1].departure.airport.name.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(flightQuery) &&
                  !flight[1].arrival.airport.code.toLowerCase()
                    .includes(flightQuery) &&
                  !flight[1].arrival.airport.name.toLowerCase()
                    .replace(/\s/g, '')
                    .includes(flightQuery) &&
                  !(flight[1].airline.code + flight[1].number.toString()).toLowerCase()
                    .includes(flightQuery)) {
                flight[1].appearsInSearch = false;
              }
            }
            this.hideFlights();
            this.displayFlights();
            break;
          case 'trip':
            if (!this.searchTabSelected.trip) {
              this.selectSearchTab(this.SEARCH_TAB__TRIP);
            }
            console.log(split[1]);
            break;
          default:
            if (!this.searchTabSelected.search) {
              this.selectSearchTab(this.SEARCH_TAB__SEARCH);
            }
            console.log(split[0] + ':' + split[1]);
        }
      } else {
        if (!this.searchTabSelected.search) {
          this.selectSearchTab(this.SEARCH_TAB__SEARCH);
        }
        for (let airport of this.airports) {
          if (!airport[1].location.city.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !airport[1].location.country.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !airport[1].location.countryA2.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !airport[1].name.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !airport[1].code
                .toLowerCase()
                .includes(query)) {
            airport[1].appearsInSearch = false;
          }
        }
        this.hideAirports();
        this.displayAirports();
        for (let flight of this.flights) {
          if (!flight[1].airline.name.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].airline.code
                .toLowerCase()
                .includes(query) &&
              !(flight[1].airline.code + flight[1].number.toString()).toLowerCase()
                .includes(query) &&
              !flight[1].departure.airport.code.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].departure.airport.location.city.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].departure.airport.location.country.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].departure.airport.location.countryA2
                .toLowerCase()
                .includes(query) &&
              !flight[1].arrival.airport.code.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].arrival.airport.location.city.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].arrival.airport.location.country.replace(/\s/g, '')
                .toLowerCase()
                .includes(query) &&
              !flight[1].arrival.airport.location.countryA2
                .toLowerCase()
                .includes(query)) {
            flight[1].appearsInSearch = false;
          }
        }
        this.hideFlights();
        this.displayFlights();
      }
    },

    clearSearch() {
      this.searchQuery = '';
      for (let airport of this.airports) {
        airport[1].appearsInSearch = true;
      }
      this.displayAirports();
      for (let flight of this.flights) {
        flight[1].appearsInSearch = true;
      }
      this.displayFlights();
    },

    determineSearchErrorState() {
      this.searchError = false;
      this.searchError = this.searchError || this.searchErrors.TooManySpecifications;
      return this.searchError;
    },

    selectSearchTab(tabName) {
      switch (tabName) {
        case this.SEARCH_TAB__SEARCH:
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.search = true;
          break;
        case this.SEARCH_TAB__AIRPORT:
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.airport = true;
          break;
        case this.SEARCH_TAB__FLIGHT:
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.flight = true;
          break;
        case this.SEARCH_TAB__TRIP:
          for (let i in this.searchTabSelected) {
            this.searchTabSelected[i] = false;
          }
          this.searchTabSelected.trip = true;
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
      if (flightList !== null && flightList.length > 0) {
        for (let flight of flightList) {
          flight.appearsInSearch = true;
          flight.airline = this.airlines.get(flight.airline);
          flight.departure.airport = this.airports.get(flight.departure.airport);
          flight.arrival.airport = this.airports.get(flight.arrival.airport);
          this.flights.set(flight._id, flight);
        }
        this.createFlightLines();
      }
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
        let polyline = L.polyline(connectedDots, {color: 'var(--color-accent-blue)'})
          .addTo(map);
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

    displayFlights() {
      for (let flight of this.flights) {
        if (flight[1].appearsInSearch) {
          this.flightLines.get(flight[0])
            .setStyle({opacity: 1});
        }
      }
    },

    hideFlights() {
      for (let line of this.flightLines) {
        line[1].setStyle({opacity: 0});
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
      let departureAirportId = this.flights.get(flightId).departure.airport._id;
      let selectedAirportMarker = this.airportMarkers.get(departureAirportId);
      selectedAirportMarker.setIcon(redIcon);
      this.airports.get(departureAirportId).appearsInSearch = true;
      this.selectedAirportMarkers.push(selectedAirportMarker);
      let arrivalAirportId = this.flights.get(flightId).arrival.airport._id;
      selectedAirportMarker = this.airportMarkers.get(arrivalAirportId);
      selectedAirportMarker.setIcon(redIcon);
      this.airports.get(arrivalAirportId).appearsInSearch = true;
      this.selectedAirportMarkers.push(selectedAirportMarker);
      this.displayAirports();
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
