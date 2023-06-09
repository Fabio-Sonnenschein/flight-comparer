<template>
  <div class="map-selection--content">
    <div class="trip-header-container">
      <div class="trip-header-container--left">
        <p class="trip-header--title">{{ this.tripData.name }}</p>
        <p class="trip-header--subtitle">{{ this.tripData.description }}</p>
      </div>
      <div class="trip-header-container--right">
        <p class="trip-header--type">{{ this.tripData.roundTrip ? 'Round Trip' : 'One Way' }}</p>
        <span class="icon trip-header--type-icon">{{ this.tripData.roundTrip ? 'sync_alt' : 'trending_flat' }}</span>
      </div>
    </div>
    <div class="trip-flight-container">
      <p class="trip-container-title">Itinerary</p>
      <div class="trip-flight" v-for="flight in this.tripData.flights">
        <p class="trip-flight--departure-time">
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
        <p class="trip-flight--number">{{ flight.airline.code }} {{ flight.number }}</p>
        <p class="trip-flight--departure">{{ flight.departure.airport.code }}</p>
        <span class="icon">trending_flat</span>
        <p class="trip-flight--arrival">{{ flight.arrival.airport.code }}</p>
      </div>
    </div>
    <div class="trip-airline-container">
      <p class="trip-container-title">Airlines</p>
      <p class="trip-airline" v-for="airline in this.tripData.airlines">{{ airline.name }}</p>
    </div>
    <div class="trip-sales-container">
      <p class="trip-container-title">Offer</p>
      <p class="trip-sales-vendor">{{ this.tripData.vendor }}</p>
      <p class="trip-sales-price">{{ this.tripData.cost.price }} {{ this.tripData.cost.currency }}</p>
      <a class="trip-sales-link" :href="this.tripData.link">Link to offer</a>
    </div>
  </div>
  <div class="details-action-container">
    <RouterLink
        :to="{ name: 'trip', params: {tripId: this.tripData._id} }"
        custom
        v-slot="{ navigate }">
      <Button_Extend class="details-action"
                     :options="{
                       id: 'tripDetails',
                       icon: 'edit',
                       helper: 'Edit trip',
                       text: 'Edit trip'
                     }"
                     @clickAction="navigate"
                     role="link"/>
    </RouterLink>
  </div>
</template>

<script>
import Button_Extend from '@/components/inputs/button/Button_Extend.vue';

export default {
  name: 'MapSelection_Trip',
  components: {Button_Extend},
  data: function () {
    return {};
  },
  methods: {},
  setup(props) {
    return {props};
  },
  mounted() {
    console.log(this.tripData);
  },
  props: {
    tripData: {}
  }
};
</script>

<style scoped>

.map-selection--content {
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
          "header header header"
          "itinerary airlines sales";
  row-gap: 2rem;
  column-gap: 2rem;
}

.trip-header-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  grid-area: header;
}

.trip-header-container--left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.trip-header--title {
  font-size: 1.75rem;
  line-height: 1.75rem;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 0 .5rem;
}

.trip-header--subtitle {
  font-size: 1.25rem;
  line-height: 1.25rem;
  margin: 0;
}

.trip-header-container--right {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.trip-header--type {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
}

.trip-header--type-icon {
  margin-left: 1rem;
}

.trip-container-title {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: .125rem;
}

.trip-flight-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-area: itinerary;
}

.trip-flight {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr .5fr 1fr;
  column-gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
}

.trip-flight:last-of-type {
  margin-bottom: 0;
}

.trip-flight p {
  margin: 0;
}

.trip-flight--departure, .trip-flight--arrival {
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 500;
  padding: .5rem;
  border-radius: .25rem;
  background: var(--color-background-less);
  text-align: center;
  width: 2.25rem;
}

.trip-airline-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-area: airlines;
}

.trip-airline {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0 0 .75rem;
}

.trip-airline:last-of-type {
  margin: 0;
}

.trip-sales-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-area: sales;
}

.trip-sales-vendor, .trip-sales-link {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0 0 .75rem
}

.trip-sales-price {
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 0 0 .75rem;
}

.trip-sales-link {
  margin: 0;
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
