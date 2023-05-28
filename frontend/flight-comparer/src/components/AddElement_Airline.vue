<template>
  <div class="add-element--airline-container edit-input-column">
    <Input class="edit-input-container"
           :options="{
             fieldType: 'text',
             icon: '',
             id: 'addIataAirlineCode',
             initialValue: '',
             label: 'IATA Airline Code',
             placeholder: 'IATA Airline Code'
           }"
           @changeAction="(inputId, value) => {this.airline.code = value;}"/>
    <Input class="edit-input-container"
           :options="{
             fieldType: 'text',
             icon: '',
             id: 'addAirlineName',
             initialValue: '',
             label: 'Airline Name',
             placeholder: 'Airline Name'
           }"
           @changeAction="(inputId, value) => {this.airline.name = value;}"/>
    <Input class="edit-input-container"
           :options="{
             fieldType: 'text',
             icon: '',
             id: 'addAlliance',
             initialValue: '',
             label: 'Alliance',
             placeholder: 'Alliance'
           }"
           @changeAction="(inputId, value) => {this.airline.alliance = value;}"/>
  </div>
</template>

<script>
import Input from '@/components/inputs/text/Input.vue';

export default {
  name: 'AddElement_Airline',
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
    airline: {}
  }
};
</script>

<style scoped>

.add-element--airline-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.add-element--airline-container .edit-input-container {
  margin-right: 1rem;
  margin-bottom: 0;
}

</style>
