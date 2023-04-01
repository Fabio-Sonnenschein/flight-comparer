<template>
  <div class="search-element">
    <h1 class="title">{{ this.airportData.airportCode }}</h1>
    <div class="search-element-details">
      <h2 class="name">{{ this.airportData.airportName }}</h2>
      <p class="location">{{ this.airportData.airportCity }}, {{ this.airportData.airportCountry }}
        {{ this.getFlagEmoji() }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchElement_Airport',
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
.search-element {
  border-radius: 8px;
  background-color: var(--color-background-less);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
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
</style>
