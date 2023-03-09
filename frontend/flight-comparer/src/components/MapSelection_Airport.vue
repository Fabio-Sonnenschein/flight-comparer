<template>
  <div class="map-selection--airport">
    <h1>{{ this.airportData.airportCode }}</h1>
    <h2>{{ this.airportData.airportName }}</h2>
    <p>{{ this.airportData.airportCity }}, {{ this.airportData.airportCountry }} {{ this.getFlagEmoji() }}</p>
  </div>
</template>

<script>
export default {
  name: 'MapSelection_Airport',
  methods: {
    getFlagEmoji() {
      let charArray = this.airportData.airportCountryA2.toUpperCase()
          .split('')
          .map((char) => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...charArray);
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {

  },
  props: {
    airportData: {
      airportCode: String,
      airportName: String,
      airportCity: String,
      airportCountry: String,
      airportCountryA2: String
    }
  }
};
</script>

<style scoped>
.map-selection--airport {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
