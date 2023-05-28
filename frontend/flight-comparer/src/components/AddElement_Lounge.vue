<template>
  <div class="edit-input-column">
    <p class="edit-section-title">Details</p>
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLoungeName',
               initialValue: '',
               label: 'Name',
               placeholder: 'Name'
             }"
             @changeAction="(inputId, value) => {this.lounge.name = value;}"/>
    </div>
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLoungeType',
               initialValue: '',
               label: 'Type',
               placeholder: 'Type'
             }"
             @changeAction="(inputId, value) => {this.lounge.type = value;}"/>
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLoungeLocation',
               initialValue: '',
               label: 'Location',
               placeholder: 'Location'
             }"
             @changeAction="(inputId, value) => {this.lounge.location = value;}"/>
    </div>
    <p class="edit-section-title">Access</p>
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLoungeAccess',
               initialValue: '',
               label: 'Access',
               placeholder: 'Access'
             }"
             @changeAction="(inputId, value) => {this.lounge.access = value;}"/>
    </div>
    <div class="edit-input-row">
      <Select_List class="edit-input-container"
                   :options="{
                     data: this.lounge.airlines,
                     id: 'airportLoungeAirlines',
                     valueVariable: '_id',
                     labelVariable: 'name',
                     label: 'Airlines'
                   }"
                   @changeAction="(inputId, value) => {this.lounge.airlines = value;}"/>
    </div>
    <p class="edit-section-title">Features</p>
    <div class="edit-input-row">
      <Input class="edit-input-container"
             :options="{
               fieldType: 'text',
               icon: '',
               id: 'airportLoungeDescription',
               initialValue: '',
               label: 'Description',
               placeholder: 'Description'
             }"
             @changeAction="(inputId, value) => {this.lounge.description = value;}"/>
    </div>
    <div class="edit-input-row">
      <Select_List class="edit-input-container"
                   :options="{
                     data: this.lounge.amenities,
                     id: 'airportLoungeAmenities',
                     valueVariable: '_id',
                     labelVariable: 'text',
                     iconVariable: 'icon',
                     label: 'Amenities'
                   }"
                   @changeAction="(inputId, value) => {this.lounge.amenities = value}"/>
    </div>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';
import Select_List from '@/components/inputs/selection/Select_List.vue';

export default {
  name: 'AddElement_Lounge',
  components: {Select_List, Input},
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
    lounge: {
      airlines: {type: Array},
      amenities: {type: Array}
    }
  }
};
</script>

<style scoped>

</style>
