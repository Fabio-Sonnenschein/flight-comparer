<template>
  <div class="map-selection--background">
    <span class="background-text--large">{{ this.airportData.code }}</span>
  </div>
  <div class="map-selection--airport">
    <h1>{{ this.airportData.name }}</h1>
    <p>{{ this.airportData.location.city }}, {{ this.airportData.location.country }} {{ this.getFlagEmoji() }}</p>
  </div>
  <div class="details-action-container">
    <RouterLink
          :to="{ name: 'airport', params: {airportId: this.airportData._id} }"
          custom
          v-slot="{ navigate }">
      <Button_Extend class="details-action"
                     :options="{
                       id: 'airportDetails',
                       icon: 'info',
                       helper: 'More information',
                       text: 'More information'
                     }"
                     @clickAction="navigate"
                     role="link"/>
    </RouterLink>
  </div>
</template>

<script>
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

export default {
  name: 'MapSelection_Airport',
  components: {Button_Extend},
  methods: {
    getFlagEmoji() {
      let charArray = this.airportData.location.countryA2.toUpperCase()
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
    airportData: {}
  }
};
</script>

<style scoped>
.map-selection--background {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  left: -4rem;
  bottom: -3.5rem;
  user-select: none;
  text-indent: 1rem;
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

.details-action-container {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  flex-direction: row;
}

.details-action {
  background: var(--color-background-less);
  margin: 0 1rem 0 0;
}

.details-action:last-of-type {
  margin-right: 0;
}
</style>
