<template>
  <AddElementWrapper
        :type="'airline'"
        v-if="this.showAddAirline"
        v-on:closeOverlay="closeOverlay"
        v-on:created="createdAirline"/>
  <div class="content-pane">
    <div class="preference-search-wrapper">
      <div class="preference-search-container">
        <div class="preference-search-bar-container">
          <Input_Search class="search-input-container"
                        :options="{
                          id: 'airlineSearch',
                          placeholder: 'Search for an airline',
                          initialValue: ''
                        }"
                        @changeAction="this.search"
                        @clearAction="this.clearSearch"/>
          <Button_Extend class="preference-search-action"
                         :options="{
                           id: 'addAirline',
                           icon: 'add',
                           helper: 'Add airline',
                           text: 'Add Airline'
                         }"
                         @clickAction="this.showAddAirline = true"/>
        </div>
        <div class="search-error-container" v-if="this.searchError">
        </div>
        <div class="search-output"
             :key="airlineListKey">
          <div class="search-output--empty" v-if="this.airlines.size <= 0">
            <span class="icon">airlines</span>
            <p>It seems there are no airlines saved. Add an airline with the button above, next to the search.</p>
          </div>
          <div v-for="airline in this.airlines"
               v-if="this.airlines.size > 0">
            <SearchElement_Airline
                  v-if="airline[1].appearsInSearch"
                  :airline-data="this.airlines.get(airline[0])"
                  v-on:action="deleteAirline"
                  :editable="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchElement_Airline from '@/components/SearchElement_Airline.vue';
import AddElementWrapper from '@/components/AddElementWrapper.vue';
import Input_Search from '@/components/inputs/text/Input_Search.vue';
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

export default {
  name: 'Preferences_Airline',
  components: {Button_Extend, Input_Search, AddElementWrapper, SearchElement_Airline},
  data: function () {
    return {
      searchError: false,
      searchQuery: '',
      airlines: new Map(),
      airlineListKey: 0,
      showAddAirline: false
    };
  },
  methods: {
    search(searchInputId, searchQuery) {
      this.searchQuery = searchQuery;
      for (let airline of this.airlines) {
        airline[1].appearsInSearch = true;
      }
      let query = this.searchQuery.replace(/\s/g, '')
        .toLowerCase();
      for (let airline of this.airlines) {
        if (!airline[1].code.replace(/\s/g, '')
              .toLowerCase()
              .includes(query) &&
            !airline[1].name.replace(/\s/g, '')
              .toLowerCase()
              .includes(query) &&
            !airline[1].alliance.replace(/\s/g, '')
              .toLowerCase()
              .includes(query)) {
          airline[1].appearsInSearch = false;
        }
      }
    },

    clearSearch(searchInputId) {
      this.searchQuery = '';
      for (let airline of this.airlines) {
        airline[1].appearsInSearch = true;
      }
    },

    async apiGETAirlines() {
      const request = await fetch('http://127.0.0.1:8080/airline/all');
      if (!request.ok) {
        console.error(request.text());
      }
      const airlineList = await request.json();
      for (let airline of airlineList) {
        airline.appearsInSearch = true;
        this.airlines.set(airline._id, airline);
      }
    },

    deleteAirline(airlineId) {
      this.airlines.delete(airlineId);
      this.airlineListKey++;
    },

    closeOverlay() {
      this.showAddAirline = false;
    },

    createdAirline(insertedData) {
      insertedData.appearsInSearch = true;
      this.airlines.set(insertedData._id, insertedData);
      this.closeOverlay();
    }
  },
  async mounted() {
    await this.apiGETAirlines();
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
