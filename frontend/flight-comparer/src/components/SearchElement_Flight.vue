<template>
  <div class="search-element">
    <div class="search-element-title-container">
      <h1 class="search-element-title">{{ this.flightData.flightNumber }}</h1>
      <h1 class="search-element-subtitle">{{ this.flightData.airline.name }}</h1>
    </div>
    <div class="search-element-content">
      <div class="flight-overview-container">
        <div class="flight-airport-codes">
          <h2 class="departure-airport">{{ this.flightData.departure.airport.code }}</h2>
          <span class="icon">flight</span>
          <h2 class="arrival-airport">{{ this.flightData.arrival.airport.code }}</h2>
        </div>
        <div class="flight-line"></div>
      </div>
      <div class="flight-time-container">
        <div>
          <p class="flight-time flight-time-departure">
            <!--{{
              new Date(this.flightData.departure.time.time)
                  .toLocaleString(Intl.DateTimeFormat()
                      .resolvedOptions().locale, {
                    timeZone: 'UTC',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })
            }}-->
            {{
              new Date(this.flightData.departure.time.time)
                  .toLocaleString(Intl.DateTimeFormat()
                      .resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
            }}
            <span class="time-zone-addition">{{ this.flightData.departure.time.zone }}</span>
          </p>
          <!--<p class="flight-time-utc flight-time-departure-utc">
            {{
              new Date(this.flightData.departure.time.utc)
                  .toLocaleString(Intl.DateTimeFormat()
                      .resolvedOptions().locale, {
                    timeZone: 'UTC',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })
            }}
            {{
              new Date(this.flightData.departure.time.utc)
                  .toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
            }}
            <span class="time-zone-addition">UTC</span>
          </p>-->
        </div>
        <div>
          <p class="flight-time-duration">
            {{ Math.floor(this.flightData.duration) }} h
            {{ Math.round((this.flightData.duration - Math.floor(this.flightData.duration)).toFixed(4) * 60) }} min
          </p>
        </div>
        <div>
          <p class="flight-time flight-time-arrival">
            <!--{{
              new Date(this.flightData.arrival.time.time)
                  .toLocaleString(Intl.DateTimeFormat()
                      .resolvedOptions().locale, {
                    timeZone: 'UTC',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })
            }}-->
            {{
              new Date(this.flightData.arrival.time.time)
                  .toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
            }}
            <sup class="time-date-difference" v-if="this.dateDifference !== ''">{{ this.dateDifference }}</sup>
            <span class="time-zone-addition">{{ this.flightData.arrival.time.zone }}</span>
          </p>
          <!--<p class="flight-time-utc flight-time-arrival-utc">
            {{
              new Date(this.flightData.arrival.time.utc)
                  .toLocaleString(Intl.DateTimeFormat()
                      .resolvedOptions().locale, {
                    timeZone: 'UTC',
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })
            }}
            {{
              new Date(this.flightData.arrival.time.utc)
                  .toLocaleString(Intl.DateTimeFormat().resolvedOptions().locale, {timeZone: 'UTC', timeStyle: 'short'})
            }}
            <sup class="time-date-difference" v-if="this.dateDifferenceUTC !== ''">{{ this.dateDifferenceUTC }}</sup>
            <span class="time-zone-addition">UTC</span>
          </p>-->
        </div>
      </div>
      <div class="flight-details">
        <div class="flight-detail">
          <span class="icon">event</span>
          <p>
            {{
              new Date(this.flightData.departure.time.utc)
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
        <div class="flight-detail">
          <span class="icon">flight_class</span>
          <p>{{ this.flightData.cabin }}</p>
        </div>
        <div class="flight-detail" v-if="this.flightData.overnight">
          <span class="icon">sleep</span>
          <p>Overnight</p>
        </div>
        <div class="flight-detail">
          <span class="icon">flight</span>
          <p>{{ this.flightData.aircraft }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchElement_Flight',
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

.search-element {
  background: var(--color-background-less);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.search-element-content {
  width: 100%;
  flex-grow: 4;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.search-element-title-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.search-element-title {
  margin: 0 0 0 .5rem;
}

.search-element-subtitle {
  margin: 0 0 0 1.25rem;
  font-weight: normal;
  font-size: 1.5rem;
}

.flight-overview-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flight-line {
  width: 2px;
  margin-left: -1px;
  height: 100%;
  position: absolute;
  background: var(--color-accent-blue);
}

.flight-airport-codes {
  min-width: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 2;
  z-index: 1;
}

.flight-airport-codes h2 {
  text-align: center;
  background: var(--color-background-less);
  margin: 0;
  line-height: 2rem;
}

.flight-airport-codes .departure-airport {
  padding: 0 0 .25rem;
}

.flight-airport-codes .arrival-airport {
  padding: .25rem 0 0;
}

.flight-airport-codes .icon {
  transform: rotate(180deg);
  background: var(--color-background-less);
  padding: .75rem;
}

.flight-time-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 1rem;
}

.flight-time {
  margin: 0;
  font-size: 1.3rem;
}

.flight-time-utc {
  font-size: .8rem;
  margin: 0;
}

.time-date-difference {
  font-size: 1rem;
  margin: 0 0 0 .125rem;
}

.time-zone-addition {
  font-size: .8rem;
  margin-left: .5rem;
}

.flight-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 4rem;
}

.flight-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.flight-detail p {
  margin: 0 0 0 1rem;
}

</style>
