<template>
  <p class="edit-section-title">Identifiers</p>
  <div class="edit-input-column">
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportCode',
               initialValue: '',
               label: 'IATA Code',
               placeholder: 'IATA Code'
             }"
             @changeAction="(inputId, value) => {this.airport.code = value;}"/>
    </div>
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportName',
               initialValue: '',
               label: 'Airport Name',
               placeholder: 'Airport Name'
             }"
             @changeAction="(inputId, value) => {this.airport.name = value;}"/>
    </div>
  </div>
  <p class="edit-section-title">Location</p>
  <div class="edit-input-column">
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLocationCity',
               initialValue: '',
               label: 'City',
               placeholder: 'City'
             }"
             @changeAction="(inputId, value) => {this.airport.location.city = value;}"/>
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLocationCountry',
               initialValue: '',
               label: 'Country',
               placeholder: 'Country'
             }"
             @changeAction="(inputId, value) => {this.airport.location.country = value;}"/>
    </div>
    <div class="edit-input-row">
      <div class="edit-input-column">
        <div class="edit-input-row">
          <Input class="edit-input-container"
                 :options="{
                   fieldType: 'text',
                   icon: '',
                   id: 'airportLocationCountryA2',
                   initialValue: '',
                   label: 'ALPHA-2 Country Code',
                   placeholder: 'ALPHA-2 Country Code'
                 }"
                 @changeAction="(inputId, value) => {this.airport.location.countryA2 = value;}"/>
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
               id: 'airportPositionLatitude',
               initialValue: '',
               label: 'Latitude',
               placeholder: 'Latitude'
             }"
             @changeAction="(inputId, value) => {this.airport.position.latitude = value;}"/>
      <Input class="edit-input-container"
             :options="{
               fieldType: 'number',
               icon: '',
               id: 'airportPositionLongitude',
               initialValue: '',
               label: 'Longitude',
               placeholder: 'Longitude'
             }"
             @changeAction="(inputId, value) => {this.airport.position.longitude = value;}"/>
    </div>
  </div>
</template>

<script>

import Input from '@/components/inputs/text/Input.vue';

export default {
  name: 'AddElement_Airport',
  components: {Input},
  data: function () {
    return {};
  },
  methods: {},
  setup(props) {
    return {props};
  },
  mounted() {
  },
  props: {
    airport: {}
  }
};
</script>

<style scoped>

</style>
