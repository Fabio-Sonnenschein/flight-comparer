<template>
  <AddElementWrapper
      :type="'airport'"
      v-if="this.showAddAirport"
      v-on:closeOverlay="closeOverlay"
      v-on:created="createdAirport"/>
  <div class="content-pane">
    <div class="preference-search-wrapper">
      <div class="preference-search-container">
        <div class="preference-search-bar-container">
          <Input_Search class="search-input-container"
                        :options="{
                          id: 'airportSearch',
                          placeholder: 'Search for an airport',
                          initialValue: ''
                        }"
                        @changeAction="this.search"
                        @clearAction="this.clearSearch"/>
          <Button_Extend class="preference-search-action"
                         :options="{
                           id: 'addAirport',
                           icon: 'add',
                           helper: 'Add airport',
                           text: 'Add Airport'
                         }"
                         @clickAction="this.showAddAirport = true"/>
        </div>
        <div class="search-error-container" v-if="this.searchError">
        </div>
        <div class="search-output"
             :key="airportListKey">
          <div class="search-output--empty" v-if="this.airports.size <= 0">
            <span class="icon">flight_takeoff</span>
            <p>It seems there are no airports saved. Add an airport with the button above, next to the search.</p>
          </div>
          <div v-for="airport in this.airports"
               v-if="this.airports.size > 0">
            <SearchElement_Airport
                v-if="airport[1].appearsInSearch"
                :airport-data="this.airports.get(airport[0])"
                :airlines="this.airlines"
                :amenities="this.amenities"
                v-on:action="deleteAirport"
                @updateAction="this.apiGETAirports"
                :editable="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddElementWrapper from '@/components/AddElementWrapper.vue';
import SearchElement_Airport from '@/components/SearchElement_Airport.vue';
import Input_Search from '@/components/inputs/text/Input_Search.vue';
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

export default {
  name: 'Preferences_Airport',
  components: {Button_Extend, Input_Search, SearchElement_Airport, AddElementWrapper},
  data: function () {
    return {
      searchError: false,
      searchQuery: '',
      airports: new Map(),
      airportListKey: 0,
      showAddAirport: false,
      airlines: [],
      amenities: []
    };
  },
  methods: {
    search(searchInputId, searchQuery) {
      this.searchQuery = searchQuery;
      let query = this.searchQuery.replace(/\s/g, '')
          .toLowerCase();
      for (let airport of this.airports) {
        airport[1].appearsInSearch = (airport[1].code.replace(/\s/g, '')
                                          .toLowerCase()
                                          .includes(query) ||
                                      airport[1].name.replace(/\s/g, '')
                                          .toLowerCase()
                                          .includes(query) ||
                                      airport[1].location.city.replace(/\s/g, '')
                                          .toLowerCase()
                                          .includes(query) ||
                                      airport[1].location.country.replace(/\s/g, '')
                                          .toLowerCase()
                                          .includes(query));
      }
    },

    clearSearch() {
      this.searchQuery = '';
      for (let airport of this.airports) {
        airport[1].appearsInSearch = true;
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
      this.search('update', this.searchQuery);
    },

    async apiGETAirlines() {
      const request = await fetch('http://127.0.0.1:8080/airline/all');
      if (!request.ok) {
        console.error(request.text());
      }

      this.airlines = await request.json();
    },

    async apiGETAmenities() {
      const request = await fetch('http://127.0.0.1:8080/amenity/all');
      if (!request.ok) {
        console.error(request.text());
      }

      this.amenities = await request.json();
    },

    deleteAirport(airportId) {
      this.airports.delete(airportId);
      this.airportListKey++;
    },

    closeOverlay() {
      this.showAddAirport = false;
    },

    createdAirport(insertedData) {
      insertedData.appearsInSearch = true;
      this.airports.set(insertedData._id, insertedData);
      this.closeOverlay();
    }
  },
  async mounted() {
    await this.apiGETAirlines();
    await this.apiGETAmenities();
    await this.apiGETAirports();
  }
};
</script>

<style scoped>

.content-pane {
  background: var(--color-background);
}

.preference-search-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
}

.preference-search-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preference-search-bar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.preference-search-bar-container .search-input-container {
  flex-grow: 4;
  background: var(--color-background-less);
}

.preference-search-action {
  background: var(--color-background-less);
  margin: 0 0 0 2rem;
}

.preference-search-action:last-of-type {
  margin-right: 0;
}

.search-output {
  flex-grow: 4;
  margin: 2rem 0 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.search-output--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.search-output--empty .icon {
  font-size: 3rem;
  line-height: 3rem;
}

</style>
