<template>
  <div class="map-selection--content">
    <div class="flight-carrier">{{ this.flightData.airline.name }}</div>
    <div class="flight-info-container">
      <div class="flight-info">
        <span class="icon">airplane_ticket</span>
        <p>{{ this.flightData.flightNumber }}</p>
      </div>
      <div class="flight-info">
        <span class="icon">event</span>
        <p>
          {{
            new Date(this.flightData.departure.time.time)
                .toLocaleString(Intl.DateTimeFormat()
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
    <div class="flight-location-time-details">
      <div class="flight-graph">
        <div class="flight-graph-line"></div>
        <div class="flight-graph-content">
          <div class="flight-graph-stop flight-graph-stop--departure">
            <h1>{{ this.flightData.departure.airport.code }}</h1>
            <p>{{ this.flightData.departure.airport.location.city }}</p>
          </div>
          <div class="flight-graph-icon-container">
            <span class="icon">flight</span>
          </div>
          <div class="flight-graph-stop flight-graph-stop--arrival">
            <h1>{{ this.flightData.arrival.airport.code }}</h1>
            <p>{{ this.flightData.arrival.airport.location.city }}</p>
          </div>
        </div>
      </div>
      <div class="flight-time-container">
        <p class="time-container time-container--departure">
          {{
            new Date(this.flightData.departure.time.time)
                .toLocaleString(Intl.DateTimeFormat()
                    .resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
          }}
          <span class="time-zone-addition">{{ this.flightData.departure.time.zone }}</span>
        </p>
        <div class="time-container time-container--duration">
          <p>
            {{ Math.floor(this.flightData.duration) }} h
            {{ Math.round((this.flightData.duration - Math.floor(this.flightData.duration)).toFixed(4) * 60) }} min
          </p>
          <div v-if="this.flightData.overnight">
            <span class="icon">sleep</span>
            <p>Overnight</p>
          </div>
        </div>
        <p class="time-container time-container--arrival">
          {{
            new Date(this.flightData.arrival.time.time)
                .toLocaleString(Intl.DateTimeFormat()
                    .resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
          }}
          <sup class="time-date-difference" v-if="this.dateDifference !== ''">{{ this.dateDifference }}</sup>
          <span class="time-zone-addition">{{ this.flightData.arrival.time.zone }}</span>
        </p>
      </div>
    </div>
    <div class="flight-details">
      <div>
        <div class="flight-detail">
          <span class="icon">flight_class</span>
          <p>{{ this.flightData.cabin }}</p>
        </div>
        <div class="flight-detail">
          <span class="icon">flight</span>
          <p>{{ this.flightData.aircraft }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="details-action-container">
    <RouterLink
          :to="{ name: 'flight', params: {flightId: this.flightData.flightId} }"
          custom
          v-slot="{ navigate }">
      <div class="details-action" @click="navigate" role="link">
        <span class="action-icon icon">edit</span>
        <p class="action-text">Edit flight</p>
      </div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'MapSelection_Flight',
  data: function() {
    return {
      dateDifference: '',
      dateDifferenceUTC: ''
    };
  },
  methods: {
    calculateDateDifference() {
      let dateDifference = (new Date(new Date(this.flightData.arrival.time.time).toDateString()) - new Date(
        new Date(this.flightData.departure.time.time).toDateString())) / 86400000;
      if (dateDifference > 0) {
        this.dateDifference = '+' + dateDifference;
      }
      if (dateDifference < 0) {
        this.dateDifference = '-' + dateDifference;
      }
      let dateDifferenceUTC = (new Date(new Date(this.flightData.arrival.time.utc).toDateString()) - new Date(
        new Date(this.flightData.departure.time.utc).toDateString())) / 86400000;
      if (dateDifferenceUTC > 0) {
        this.dateDifferenceUTC = '+' + dateDifferenceUTC;
      }
      if (dateDifferenceUTC < 0) {
        this.dateDifferenceUTC = '-' + dateDifferenceUTC;
      }
    }
  },
  setup(props) {
    return {props};
  },
  mounted() {
    this.calculateDateDifference();
  },
  props: {
    flightData: {}
  }
};
</script>

<style scoped>

.map-selection--content {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 4fr;
  grid-template-areas:
          "airline airline airline"
          "info graph details";
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background: var(--color-background-69);
}

@media (prefers-color-scheme: dark) {
  .map-selection--content {
    background: transparent;
  }
}

.flight-carrier {
  grid-area: airline;
  text-align: center;
  font-size: 2rem;
  line-height: 2rem;
  margin: 1rem 0;
}

.flight-info-container {
  grid-area: info;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.flight-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.flight-info span {
  font-size: 2rem;
  line-height: 2rem;
}

.flight-info p {
  font-size: 1.3rem;
  line-height: 1.3rem;
}

.flight-location-time-details {
  grid-area: graph;
  display: flex;
  flex-direction: column;
}

.flight-graph {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.flight-graph-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(-45deg, var(--blue-grey), var(--color-accent-blue), var(--color-accent-red)) no-repeat;
}

.flight-graph-content {
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  grid-template-rows: 1fr;
  width: 100%;
  z-index: 2;
}

.flight-graph-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flight-graph-icon-container .icon {
  transform: rotate(90deg);
  font-size: 3rem;
  line-height: 3rem;
  background: var(--color-background);
  padding: 1rem;
  text-align: center;
}

.flight-graph-stop {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flight-graph-stop--departure {
  align-items: flex-start;
}

.flight-graph-stop--arrival {
  display: flex;
  align-items: flex-end;
}

.flight-graph-stop h1 {
  margin: 0;
  font-size: 2rem;
  line-height: 2rem;
  background: var(--color-background);
}

.flight-graph-stop p {
  font-size: 1.3rem;
  line-height: 1.3rem;
  margin: 0;
  background: var(--color-background);
}

.flight-graph-stop--departure p {
  padding: 1rem 2rem 0 0;
}

.flight-graph-stop--arrival p {
  padding: 1rem 0 0 2rem;
}

.flight-time-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.time-container {
  font-size: 1.3rem;
  line-height: 1.3rem;
}

.time-container .time-zone-addition {
  font-size: 1rem;
  margin-left: .3rem;
}

.time-container .time-date-difference {
  font-size: 1rem;
  margin: 0 0 0 .125rem;
}

.time-container--duration {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-container--duration div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.time-container--duration div p {
  margin: 0 0 0 1rem;
}

.time-container--arrival {
  text-align: right;
}

.flight-details {
  grid-area: details;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.flight-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
}

.flight-detail p {
  margin: 0 0 0 1rem;
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
  border-radius: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem 0 0;
  overflow: hidden;
  white-space: nowrap;
}

.details-action:last-of-type {
  margin-right: 0;
}

.details-action .action-text {
  opacity: 0;
  width: 0;
  transition: .3s;
}

.details-action:hover > .action-text {
  opacity: 1;
  width: 13.5rem;
}

</style>
