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
          <Input_Search class="search-input-container"
                        :options="{
                          id: 'amenitySearch',
                          placeholder: 'Search for an amenity',
                          initialValue: ''
                        }"
                        @changeAction="this.search"
                        @clearAction="this.clearSearch"/>
          <Button_Extend class="preference-search-action"
                         :options="{
                           id: 'addAmenity',
                           icon: 'add',
                           helper: 'Add amenity',
                           text: 'Add Amenity'
                         }"
                         @clickAction="this.showAddAmenity = true"/>
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
import Input_Search from '@/components/inputs/text/Input_Search.vue';
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

export default {
  name: 'Preferences_Amenity',
  components: {Button_Extend, Input_Search, SearchElement_Amenity, AddElementWrapper},
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
    search(searchInputId, searchQuery) {
      this.searchQuery = searchQuery;
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

    clearSearch(searchInputId) {
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
