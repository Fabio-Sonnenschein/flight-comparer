<template>
  <AddElementWrapper
        :type="'amenity'"
        v-if="this.showAddAmenity"
        v-on:closeOverlay="closeOverlay"
        v-on:created="createdAmenity"/>
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
                  placeholder="Search for an amenity"
                  v-model="searchQuery"
                  @input="search()">
            <span class="icon search-clear-icon" @click="clearSearch" v-if="this.searchQuery !== ''">clear</span>
          </div>
          <div class="preference-search-action" @click="this.showAddAmenity = true">
            <span class="action-icon icon">add</span>
            <p class="action-text">Add Amenity</p>
          </div>
        </div>
        <div class="search-error-container" v-if="this.searchError">
        </div>
        <div class="search-output"
             :key="amenityListKey">
          <div class="search-output--empty" v-if="this.amenities.size <= 0">
            <span class="icon">room_service</span>
            <p>It seems there are no amenities saved. Add an amenity with the button above, next to the search.</p>
          </div>
          <div v-for="amenity in this.amenities"
               v-if="this.amenities.size > 0"
               class="search-element--amenity">
            <SearchElement_Amenity
                  v-if="amenity[1].appearsInSearch"
                  :amenity-data="this.amenities.get(amenity[0])"
                  v-on:action="deleteAmenity"
                  :editable="true"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddElementWrapper from '@/components/AddElementWrapper.vue';
import SearchElement_Amenity from '@/components/SearchElement_Amenity.vue';

export default {
  name: 'Preferences_Amenity',
  components: {SearchElement_Amenity, AddElementWrapper},
  data: function () {
    return {
      searchError: false,
      searchQuery: '',
      amenities: new Map(),
      amenityListKey: 0,
      showAddAmenity: false
    };
  },
  methods: {
    search() {
      for (let amenity of this.amenities) {
        amenity[1].appearsInSearch = true;
      }
      let query = this.searchQuery.replace(/\s/g, '')
        .toLowerCase();
      for (let amenity of this.amenities) {
        if (!amenity[1].text.replace(/\s/g, '')
          .toLowerCase()
          .includes(query)) {
          amenity[1].appearsInSearch = false;
        }
      }
    },

    clearSearch() {
      this.searchQuery = '';
      for (let amenity of this.amenities) {
        amenity[1].appearsInSearch = true;
      }
    },

    async apiGETAmenities() {
      const request = await fetch('http://127.0.0.1:8080/amenity/all');
      if (!request.ok) {
        console.error(request.text());
      }
      const amenityList = await request.json();
      for (let amenity of amenityList) {
        amenity.appearsInSearch = true;
        this.amenities.set(amenity._id, amenity);
      }
    },

    deleteAmenity(amenityId) {
      this.amenities.delete(amenityId);
      this.amenityListKey++;
    },

    closeOverlay() {
      this.showAddAmenity = false;
    },

    createdAmenity(insertedData) {
      insertedData.appearsInSearch = true;
      this.amenities.set(insertedData._id, insertedData);
      this.closeOverlay();
    }
  },
  async mounted() {
    await this.apiGETAmenities();
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
