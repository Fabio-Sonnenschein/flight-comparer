<template>
  <div class="content-pane">
    <div class="preference-search-wrapper">
      <div class="preference-search-container">
        <div class="preference-search-bar-container">
          <div class="search-input-container">
            <span class="icon search-icon">search</span>
            <input
                  type="text"
                  class="input input--text search-input"
                  id="search-input"
                  placeholder="Search for an airline"
                  v-model="searchQuery"
                  @input="search()">
            <span class="icon search-clear-icon" @click="clearSearch" v-if="this.searchQuery !== ''">clear</span>
          </div>
          <div class="preference-search-action" @click="">
            <span class="action-icon icon">add</span>
            <p class="action-text">Add Airline</p>
          </div>
        </div>
        <div class="search-error-container" v-if="this.searchError">
        </div>
        <div class="search-output">
          <div class="search-output--empty" v-if="this.airlines.size <= 0">
            <span class="icon">airlines</span>
            <p>It seems there are no airlines saved. Add an airline with the button above, next to the search.</p>
          </div>
          <div v-for="airline in this.airlines" v-if="this.airlines.size > 0">
            <SearchElement_Airline
                  v-if="airline[1].appearsInSearch"
                  :airline-data="this.getAirlineData(airline)"
                  :editable="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchElement_Airline from '@/components/SearchElement_Airline.vue';

export default {
  name: 'Preferences_Airline',
  components: {SearchElement_Airline},
  data: function () {
    return {
      searchError: false,
      searchQuery: '',
      airlines: new Map()
    };
  },
  methods: {
    search() {
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

    clearSearch() {
      this.searchQuery = '';
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

    getAirlineData(airline) {
      return airline[1];
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
}

.preference-search-action {
  background: var(--color-background-less);
  border-radius: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 0 0 0 2rem;
  overflow: hidden;
  white-space: nowrap;
}

.preference-search-action:last-of-type {
  margin-right: 0;
}

.preference-search-action p {
  opacity: 0;
  width: 0;
  transition: .3s;
}

.preference-search-action:hover > p {
  opacity: 1;
  width: 10rem;
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
