<template>
  <div class="map-selection--background">
    <span class="background-text--large">{{ this.airportData.airportCode }}</span>
  </div>
  <div class="map-selection--airport">
    <h1>{{ this.airportData.airportName }}</h1>
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
.map-selection--background {
  overflow: hidden;
  position: absolute;
  //background: linear-gradient(135deg, var(--blue-grey), var(--color-accent-blue), var(--color-accent-red) 130%) no-repeat;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.background-text--large {
  position: absolute;
  font-size: 20rem;
  margin: 0;
  padding: 0;
  line-height: 20rem;
  font-family: "Roboto Black", sans-serif;
  -webkit-text-stroke: 1.3rem transparent;
  background: linear-gradient(-45deg, var(--blue-grey), var(--color-accent-blue), var(--color-accent-red)) no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  color: var(--color-background);
  letter-spacing: 1.7rem;
  left: -3rem;
  bottom: -3.5rem;
}

.map-selection--airport {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background-69);
}

@media (prefers-color-scheme: dark) {
  .map-selection--airport {
    background: transparent;
  }
}

.map-selection--airport h1 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  padding: 0 1rem;
  line-height: 4rem;
  text-align: center;
}

.map-selection--airport p {
  font-size: 2rem;
  font-weight: 400;
  margin: 0;
  padding: 0 1rem;
  line-height: 2rem;
  text-align: center;
}
</style>
