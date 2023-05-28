<template>
  <AddElementWrapper
      :type="'lounge'"
      :airlines="this.handOverAirlines()"
      :amenities="this.handOverAmenities()"
      v-if="this.showAddLounge"
      v-on:closeOverlay="closeOverlay"
      v-on:created="createdLounge"/>
  <div class="search-element" @click="this.$emit('select')"
       :class="this.editable ? 'airport--editable' : ''">
    <div class="search-element-content-container">
      <div class="airport-content-container airport-content-container--display"
           v-if="!this.editMode && !this.removeEntryConfirmation">
        <h1 class="title">{{ this.airportData.code }}</h1>
        <div class="search-element-details">
          <h2 class="name">{{ this.airportData.name }}</h2>
          <p class="location">{{ this.airportData.location.city }}, {{ this.airportData.location.country }}
            {{ this.getFlagEmoji() }}</p>
        </div>
      </div>
      <div class="airport-content-container airport-content-container--edit"
           v-if="this.editMode && !this.removeEntryConfirmation">
        <p class="edit-section-title">Identifiers</p>
        <div class="edit-input-column">
          <div class="edit-input-row">
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airportCode---' + this.airportData.id,
                     initialValue: this.airportEdit.code,
                     label: 'IATA Code',
                     placeholder: 'IATA Code'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.code = value;}"/>
          </div>
          <div class="edit-input-row">
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airportName---' + this.airportData.id,
                     initialValue: this.airportEdit.name,
                     label: 'Airport Name',
                     placeholder: 'Airport Name'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.name = value;}"/>
          </div>
        </div>
        <p class="edit-section-title">Location</p>
        <div class="edit-input-column">
          <div class="edit-input-row">
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airportLocationCity---' + this.airportData.id,
                     initialValue: this.airportEdit.location.city,
                     label: 'City',
                     placeholder: 'City'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.location.city = value;}"/>
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'text',
                     icon: '',
                     id: 'airportLocationCountry---' + this.airportData.id,
                     initialValue: this.airportEdit.location.country,
                     label: 'Country',
                     placeholder: 'Country'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.location.country = value;}"/>
          </div>
          <div class="edit-input-row">
            <div class="edit-input-column">
              <div class="edit-input-row">
                <Input class="edit-input-container"
                       :options="{
                         fieldType: 'text',
                         icon: '',
                         id: 'airportLocationCountryA2---' + this.airportData.id,
                         initialValue: this.airportEdit.location.countryA2,
                         label: 'ALPHA-2 Country Code',
                         placeholder: 'ALPHA-2 Country Code'
                       }"
                       @changeAction="(inputId, value) => {this.airportEdit.location.countryA2 = value;}"/>
                <div class="edit-input-container">
                  <p class="country-emoji">{{ this.getFlagEmoji(this.airportEdit.location.countryA2) }}</p>
                </div>
              </div>
              <div class="edit-input-row">
                <div class="edit-hint-container">
                  ALPHA-2 country codes can be found on <a href="https://www.iban.com/country-codes" target="_blank"
                                                           rel="noopener noreferrer">iban.com</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="edit-section-title">Position</p>
        <div class="edit-input-column">
          <div class="edit-input-row">
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'number',
                     icon: '',
                     id: 'airportPositionLatitude---' + this.airportData.id,
                     initialValue: this.airportEdit.position.latitude,
                     label: 'Latitude',
                     placeholder: 'Latitude'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.position.latitude = value;}"/>
            <Input class="edit-input-container"
                   :options="{
                     fieldType: 'number',
                     icon: '',
                     id: 'airportPositionLongitude---' + this.airportData.id,
                     initialValue: this.airportEdit.position.longitude,
                     label: 'Longitude',
                     placeholder: 'Longitude'
                   }"
                   @changeAction="(inputId, value) => {this.airportEdit.position.longitude = value;}"/>
          </div>
        </div>
        <p class="edit-section-title">Lounges</p>
        <div class="edit-section-action-container">
          <Button_Text :options="{
                         id: 'airportAddLoungeButton---' + this.airportData.id,
                         helper: 'Add lounge',
                         text: 'Add Lounge'
                       }"
                       @clickAction="this.showAddLounge = true"/>
        </div>
        <div class="edit-input--border"
             v-for="lounge in airportEdit.lounges"
             v-if="airportEdit.lounges.length >= 1 && airportEdit.lounges[0].name !== ''"
             :key="this.loungeListKey">
          <div class="edit-input-column">
            <p class="edit-section-title">Details</p>
            <div class="edit-input-row">
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'airportLoungeName---' + lounge.id,
                       initialValue: lounge.name,
                       label: 'Name',
                       placeholder: 'Name'
                     }"
                     @changeAction="(inputId, value) => {lounge.name = value;}"/>
            </div>
            <div class="edit-input-row">
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'airportLoungeType---' + lounge.id,
                       initialValue: lounge.type,
                       label: 'Type',
                       placeholder: 'Type'
                     }"
                     @changeAction="(inputId, value) => {lounge.type = value;}"/>
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'airportLoungeLocation---' + lounge.id,
                       initialValue: lounge.location,
                       label: 'Location',
                       placeholder: 'Location'
                     }"
                     @changeAction="(inputId, value) => {lounge.location = value;}"/>
            </div>
            <p class="edit-section-title">Access</p>
            <div class="edit-input-row">
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'airportLoungeAccess---' + lounge.id,
                       initialValue: lounge.access,
                       label: 'Access',
                       placeholder: 'Access'
                     }"
                     @changeAction="(inputId, value) => {lounge.access = value;}"/>
            </div>
            <div class="edit-input-row">
              <Select_List class="edit-input-container"
                           :options="{
                             data: lounge.airlines,
                             id: 'airportLoungeAirlines---' + lounge.id,
                             valueVariable: '_id',
                             labelVariable: 'name',
                             label: 'Airlines'
                           }"
                           @changeAction="(inputId, value) => {lounge.airlines = value;}"/>
            </div>
            <p class="edit-section-title">Features</p>
            <div class="edit-input-row">
              <Input class="edit-input-container"
                     :options="{
                       fieldType: 'text',
                       icon: '',
                       id: 'airportLoungeDescription---' + lounge.id,
                       initialValue: lounge.description,
                       label: 'Description',
                       placeholder: 'Description'
                     }"
                     @changeAction="(inputId, value) => {lounge.description = value;}"/>
            </div>
            <div class="edit-input-row">
              <Select_List class="edit-input-container"
                           :options="{
                             data: lounge.amenities,
                             id: 'airportLoungeAmenities---' + lounge.id,
                             valueVariable: '_id',
                             labelVariable: 'text',
                             iconVariable: 'icon',
                             label: 'Amenities'
                           }"
                           @changeAction="(inputId, value) => {lounge.amenities = value}"/>
            </div>
            <div class="edit-input-row">
              <Button_Text class="edit-input-container" :options="{
                             id: 'airportLoungeRemoveButton---' + lounge.id,
                             helper: 'Remove lounge',
                             text: 'Remove Lounge',
                             emphasis: true
                           }"
                           @clickAction="(inputId) => {this.removeLounge(lounge.id);}"/>
            </div>
          </div>
        </div>
      </div>
      <div class="remove-entry-confirmation-container" v-if="this.removeEntryConfirmation">
        <div class="remove-entry-confirmation-hint">
          <span class="icon">priority_high</span>
          <p>Deleting an airport will also remove any connected flights and trips!</p>
        </div>
        <div class="remove-entry-confirmation-actions">
          <Button_Text :options="{
                         helper: 'Cancel removal',
                         id: 'cancelRemoval---' + this.airportData.id,
                         text: 'Cancel'
                       }"
                       @clickAction="this.cancelRemoval"/>
          <Button_Text :options="{
                         emphasis: true,
                         helper: 'Remove airport',
                         id: 'confirmRemoval---' + this.airportData.id,
                         text: 'Remove Airport',
                       }"
                       @clickAction="this.deleteItem"/>
        </div>
      </div>
      <div class="search-element-edit-action-container"
           :class="this.editMode ? 'search-element-edit-action-container--edit-mode' : ''"
           v-if="this.editable && !this.removeEntryConfirmation">
        <Button_Icon :options="{
                       id: 'editAirport---' + this.airportData.id,
                       icon: 'edit',
                       helper: 'Edit Airport'
                     }"
                     @clickAction="this.edit"
                     v-if="!this.editMode"/>
        <Button_Icon :options="{
                       id: 'discardAirport---' + this.airportData.id,
                       icon: 'clear',
                       helper: 'Discard Changes'
                     }"
                     @clickAction="this.discard"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'saveAirport---' + this.airportData.id,
                       icon: 'save',
                       helper: 'Save Changes'
                     }"
                     @clickAction="this.save"
                     v-if="this.editMode"/>
        <Button_Icon :options="{
                       id: 'removeAirport---' + this.airportData.id,
                       icon: 'delete',
                       helper: 'Remove Airport'
                     }"
                     @clickAction="this.confirmRemoval"
                     v-if="this.editMode"/>
      </div>
    </div>
    <div class="edit-mode-hint" v-if="this.editMode && !this.removeEntryConfirmation">
      <span class="icon">emoji_objects</span>
      <p>Any changes will be reflected on existing flights and trips that are using this airport.</p>
    </div>
  </div>
</template>

<script>
import Button_Icon from '@/components/inputs/button/Button_Icon.vue';
import Button_Text from '@/components/inputs/button/Button_Text.vue';
import Input from '@/components/inputs/text/Input.vue';
import AddElementWrapper from '@/components/AddElementWrapper.vue';
import Select_List from '@/components/inputs/selection/Select_List.vue';

export default {
  name: 'SearchElement_Airport',
  components: {Select_List, AddElementWrapper, Input, Button_Text, Button_Icon},
  emits: ['action', 'select', 'updateAction'],
  data: function () {
    return {
      editMode: false,
      airportEdit: {
        location: {},
        position: {},
        lounges: []
      },
      removeEntryConfirmation: false,
      showAddLounge: false,
      loungeListKey: 0
    };
  },
  methods: {
    getFlagEmoji(a2Code) {
      let charArray = this.airportData.location.countryA2.toUpperCase()
          .split('')
          .map((char) => 127397 + char.charCodeAt(0));
      if (a2Code !== undefined) {
        charArray = a2Code.toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
      }
      return String.fromCodePoint(...charArray);
    },

    async edit() {
      // This is unfortunately necessary because a simple this.airportEdit = this.airportData
      // acts like a pointer reference
      this.editMode = true;

      this.airportEdit.code = this.airportData.code;
      this.airportEdit.name = this.airportData.name;
      this.airportEdit.location.city = this.airportData.location.city;
      this.airportEdit.location.country = this.airportData.location.country;
      this.airportEdit.location.countryA2 = this.airportData.location.countryA2;
      this.airportEdit.position.latitude = this.airportData.position.latitude;
      this.airportEdit.position.longitude = this.airportData.position.longitude;
      this.airportEdit.lounges = [];
      let loungeId = 0;
      let newLounges = [];
      if (this.airportData.hasOwnProperty('lounges') && this.airportData.lounges.length >= 1) {
        for (let lounge of this.airportData.lounges) {
          if (lounge.name === '') {
            continue;
          }
          let newLounge = {};
          newLounge.id = this.airportData._id + '-l-' + lounge.name + '---' + loungeId;
          newLounge.name = lounge.name;
          newLounge.access = lounge.access;
          newLounge.location = lounge.location;
          newLounge.type = lounge.type;
          newLounge.description = lounge.description;
          newLounge.airlines = [];
          for (let airline of lounge.airlines) {
            let newAirline = {};
            newAirline._id = airline._id;
            newAirline.alliance = airline.alliance;
            newAirline.code = airline.code;
            newAirline.name = airline.name;
            newAirline.selected = true;
            newLounge.airlines.push(newAirline);
          }
          for (let airline of this.airlines) {
            let listed = false;
            for (let listedAirline of newLounge.airlines) {
              if (listedAirline._id === airline._id) {
                listedAirline.selected = true;
                listed = true;
              }
            }
            if (!listed) {
              let newAirline = {};
              newAirline._id = airline._id;
              newAirline.alliance = airline.alliance;
              newAirline.code = airline.code;
              newAirline.name = airline.name;
              newAirline.selected = false;
              newLounge.airlines.push(newAirline);
            }
          }
          newLounge.amenities = [];
          for (let amenity of lounge.amenities) {
            let newAmenity = {};
            newAmenity._id = amenity._id;
            newAmenity.description = amenity.description;
            newAmenity.icon = amenity.icon;
            newAmenity.text = amenity.text;
            newLounge.amenities.push(newAmenity);
          }
          for (let amenity of this.amenities) {
            let listed = false;
            for (let listedAmenity of newLounge.amenities) {
              if (listedAmenity._id === amenity._id) {
                listedAmenity.selected = true;
                listed = true;
              }
            }
            if (!listed) {
              let newAmenity = {};
              newAmenity._id = amenity._id;
              newAmenity.description = amenity.description;
              newAmenity.icon = amenity.icon;
              newAmenity.text = amenity.text;
              newAmenity.selected = false;
              newLounge.amenities.push(newAmenity);
            }
          }
          newLounges.push(newLounge);
          loungeId++;
        }
      }
      this.airportEdit.lounges = newLounges;
    },

    async save() {
      this.airportEdit._id = this.airportData._id;
      for (let lounge of this.airportEdit.lounges) {
        delete lounge.id;
        let newAirlines = [];
        for (let airline of lounge.airlines) {
          if (airline.selected) {
            newAirlines.push(airline._id);
          }
        }
        lounge.airlines = newAirlines;
        let newAmenities = [];
        for (let amenity of lounge.amenities) {
          if (amenity.selected) {
            delete amenity.selected;
            newAmenities.push(amenity._id);
          }
        }
        lounge.amenities = newAmenities;
      }
      const request = await fetch('http://127.0.0.1:8080/airport', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.airportEdit)
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.airportData.code = this.airportEdit.code;
      this.airportData.name = this.airportEdit.name;
      this.airportData.location.city = this.airportEdit.location.city;
      this.airportData.location.country = this.airportEdit.location.country;
      this.airportData.location.countryA2 = this.airportEdit.location.countryA2;
      this.editMode = false;
      this.$emit('updateAction');
    },

    discard() {
      this.editMode = false;
    },

    confirmRemoval() {
      this.editMode = false;
      this.removeEntryConfirmation = true;
    },

    cancelRemoval() {
      this.editMode = false;
      this.removeEntryConfirmation = false;
      this.discard();
    },

    async deleteItem() {
      const request = await fetch('http://127.0.0.1:8080/airport/' + this.airportData._id, {
        method: 'DELETE'
      });

      if (!request.ok) {
        console.error(request.text());
      }
      const response = await request.json();

      this.$emit('action', this.airportData._id);

      this.editMode = false;
    },

    closeOverlay() {
      this.showAddLounge = false;
    },

    createdLounge(insertedData) {
      if (this.airportEdit.lounges.length >= 1 && this.airportEdit.lounges[0].name === '') {
        this.airportEdit.lounges.pop();
      }
      this.airportEdit.lounges.push(insertedData);
      this.loungeListKey++;
      this.closeOverlay();
    },

    removeLounge(loungeId) {
      let newLoungeArray = [];
      for (let lounge of this.airportEdit.lounges) {
        if (lounge.id !== loungeId) {
          newLoungeArray.push(lounge);
        }
      }
      this.airportEdit.lounges = newLoungeArray;
    },

    handOverAirlines() {
      let newAirlineList = [];
      for (let airline of this.airlines) {
        let newAirline = {};
        newAirline._id = airline._id;
        newAirline.alliance = airline.alliance;
        newAirline.code = airline.code;
        newAirline.name = airline.name;
        newAirline.selected = false;
        newAirlineList.push(newAirline);
      }
      return newAirlineList;
    },

    handOverAmenities() {
      let newAmenityList = [];
      for (let amenity of this.amenities) {
        let newAmenity = {};
        newAmenity._id = amenity._id;
        newAmenity.description = amenity.description;
        newAmenity.icon = amenity.icon;
        newAmenity.text = amenity.text;
        newAmenity.selected = false;
        newAmenityList.push(newAmenity);
      }
      return newAmenityList;
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {

  },
  props: {
    airportData: {},
    editable: {
      type: Boolean,
      default: false
    },
    airlines: {type: Array},
    amenities: {type: Array}
  }
};
</script>

<style scoped>

.search-element {
  border-radius: 8px;
  background-color: var(--color-background-less);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.airport--editable {
  cursor: default;
}

.search-element-content-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}

.airport-content-container--display {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.title {
  margin: 0 8px 0 0;
  min-width: 5rem;
}

.search-element-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 5rem;
}

.name {
  font-size: 1.3rem;
  line-height: 2rem;
  margin: 0 0 .5rem 0;
  padding: 0;
}

.location {
  font-size: 1rem;
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
}

.search-element-edit-action-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.search-element-edit-action-container--edit-mode {
  align-items: flex-start;
  position: absolute;
  right: 0;
}

.search-element-edit-action-container > .button-container--icon {
  margin-left: 1rem;
}

.search-element-edit-action-container > .button-container--icon:first-of-type {
  margin-left: 0;
}

.airport-content-container--edit {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.edit-hint-container {
  margin: -.5rem 0 1rem 1rem;
}

.edit-mode-hint {
  padding: 1rem;
  margin: 0 -1rem -1rem -1rem;
  background: var(--color-background);
  border: 2px solid var(--color-background-less);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.edit-mode-hint p {
  margin: 0 0 0 1rem;
}

.remove-entry-confirmation-container {
  margin: -1rem;
  border: 2px solid var(--color-error);
  border-radius: 8px;
  flex-grow: 4;
  padding: 1rem;
}

.remove-entry-confirmation-hint {
  padding: 1rem;
  margin: -1rem -1rem 0 -1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.remove-entry-confirmation-hint p {
  margin: 0 0 0 1rem;
}

.remove-entry-confirmation-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: .5rem;
}

.remove-entry-confirmation-actions > .button-container {
  margin-left: 1rem;
}

.remove-entry-confirmation-actions > .button-container:first-of-type {
  margin-left: 0;
}

</style>
