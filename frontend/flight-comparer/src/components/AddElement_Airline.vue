<template>
  <div class="add-element--airline-container">
    <div class="edit-input-container">
      <label for="airline-code-input"
             class="edit-input-label">IATA Airline Code</label>
      <input type="text"
             class="input input--text edit-input"
             id="airline-code-input"
             placeholder="IATA Airline Code"
             v-model="airline.code">
    </div>
    <div class="edit-input-container">
      <label for="airline-name-input"
             class="edit-input-label">Airline Name</label>
      <input type="text"
             class="input input--text edit-input"
             id="airline-name-input"
             placeholder="Airline Name"
             v-model="airline.name">
    </div>
    <div class="edit-input-container">
      <label for="airline-alliance-input"
             class="edit-input-label">Alliance</label>
      <input type="text"
             class="input input--text edit-input"
             id="airline-alliance-input"
             placeholder="Alliance"
             v-model="airline.alliance">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddElement_Airline',
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
}

</style>
