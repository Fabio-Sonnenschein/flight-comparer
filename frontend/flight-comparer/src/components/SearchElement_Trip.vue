<template>
  <div class="search-element">
    <div class="search-element-title-container">
      <div class="search-element-title-container--first-line">
        <p class="search-element-title">{{ this.tripData.name }}</p>
        <span class="icon" :title="this.tripData.roundTrip ? 'Round Trip' : 'One Way'">
          {{ this.tripData.roundTrip ? 'sync_alt' : 'trending_flat' }}
        </span>
      </div>
      <p class="search-element-subtitle">{{ this.tripData.description }}</p>
    </div>
    <div class="search-element-content">
      <div class="trip-overview-container trip-overview-container--flights">
        <p class="trip-overview-container-title">Itinerary</p>
        <div class="trip-overview-flight" v-for="flight in this.tripData.flights">
          <p class="trip-overview-flight--departure">{{ flight.departure.airport.code }}</p>
          <span class="icon">trending_flat</span>
          <p class="trip-overview-flight--arrival">{{ flight.arrival.airport.code }}</p>
          <p class="trip-overview-flight--departure-time">
            {{
              new Date(flight.departure.time.time)
                  .toLocaleString(
                      Intl.DateTimeFormat()
                          .resolvedOptions().locale, {
                        timeZone: 'UTC',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
            }}
          </p>
        </div>
      </div>
      <div class="trip-overview-container trip-overview-container--airlines">
        <p class="trip-overview-container-title">Airlines</p>
        <div class="trip-overview-airlines">
          <p class="trip-overview-airline" v-for="airline in this.tripData.airlines">{{ airline.name }}</p>
        </div>
      </div>
      <div class="trip-overview-container trip-overview-container--sales">
        <p class="trip-overview-container-title">Offer</p>
        <div class="trip-overview-sale">
          <p class="trip-overview-vendor">{{ this.tripData.vendor }}</p>
          <p class="trip-overview-price">{{ this.tripData.cost.price }} {{ this.tripData.cost.currency }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchElement_Trip',
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
    tripData: {}
  }
};
</script>

<style scoped>

.search-element {
  background: var(--color-background-less);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.search-element-title-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1.75rem;
}

.search-element-title-container--first-line {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
}

.search-element-title {
  margin: 0;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.search-element-title-container--first-line > .icon {
  cursor: pointer;
  padding-left: 1rem;
}

.search-element-subtitle {
  margin: 0;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.125rem;
}

.search-element-content {
  width: 100%;
  flex-grow: 4;
  display: flex;
  flex-direction: column;
}

.trip-overview-container {
  margin-bottom: 2rem;
}

.trip-overview-container:last-of-type {
  margin-bottom: 0;
}

.trip-overview-container-title {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: .125rem;
}

.trip-overview-container--flights {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.trip-overview-flight {
  display: grid;
  grid-template-columns: 1fr .5fr 1fr 2fr;
  column-gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.trip-overview-flight:last-of-type {
  margin-bottom: 0;
}

.trip-overview-flight p {
  margin: 0;
}

.trip-overview-flight--departure, .trip-overview-flight--arrival {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 500;
  padding: .5rem;
  border-radius: .25rem;
  background: var(--color-background);
  text-align: center;
  width: 2.25rem;
}

.trip-overview-container--airlines {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.trip-overview-airlines {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.trip-overview-airline {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
}

.trip-overview-airline::after {
  content: ',\00a0';
}

.trip-overview-airline:last-of-type::after {
  content: '';
}

.trip-overview-container--sales {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.trip-overview-sale {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.trip-overview-sale p {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
}

</style>
