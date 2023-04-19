<template>
  <div class="view-root">
    <div class="action-pane">
      <div class="top-action-container">
        <RouterLink
              to="/"
              custom
              v-slot="{ navigate }">
          <div class="action" @click="navigate" role="link">
            <span class="icon action-icon">arrow_back</span>
            <p class="action-text">Ready to plan a trip around the world?</p>
          </div>
        </RouterLink>
      </div>
      <div class="get-back-msg-container">
        <span class="icon get-back-icon">settings</span>
        <p class="get-back-text">Preferences</p>
      </div>
      <div class="action-container">
        <div class="action"
             :class="[this.settingsTabSelected === this.SETTINGS_TAB__AIRLINE ? 'action-active' : '']"
             @click="this.settingsTabSelected = this.SETTINGS_TAB__AIRLINE">
          <span class="icon action-icon">airlines</span>
          <p class="action-text">airlines</p>
        </div>
        <div class="action"
             :class="[this.settingsTabSelected === this.SETTINGS_TAB__AIRPORT ? 'action-active' : '']"
             @click="this.settingsTabSelected = this.SETTINGS_TAB__AIRPORT">
          <span class="icon action-icon">flight_takeoff</span>
          <p class="action-text">airports</p>
        </div>
        <div class="action"
             :class="[this.settingsTabSelected === this.SETTINGS_TAB__AMENITY ? 'action-active' : '']"
             @click="this.settingsTabSelected = this.SETTINGS_TAB__AMENITY">
          <span class="icon action-icon">room_service</span>
          <p class="action-text">lounge amenities</p>
        </div>
        <div class="action"
             :class="[this.settingsTabSelected === this.SETTINGS_TAB__ABOUT ? 'action-active' : '']"
             @click="this.settingsTabSelected = this.SETTINGS_TAB__ABOUT">
          <span class="icon action-icon">info</span>
          <p class="action-text">Open Source Software &amp; about</p>
        </div>
      </div>
    </div>

    <div class="preferences-content-container">
      <Preferences_Airline v-if="this.settingsTabSelected === this.SETTINGS_TAB__AIRLINE"/>
      <Preferences_About v-if="this.settingsTabSelected === this.SETTINGS_TAB__ABOUT"/>
    </div>
  </div>
</template>


<script>
import Preferences_About from '@/components/Preferences_About.vue';
import Preferences_Airline from '@/components/Preferences_Airline.vue';

export default {
  name: 'SettingsView',
  components: {
    Preferences_Airline,
    Preferences_About
  },
  data: function () {
    return {
      SETTINGS_TAB__ABOUT: 'about',
      SETTINGS_TAB__AIRLINE: 'airline',
      SETTINGS_TAB__AIRPORT: 'airport',
      SETTINGS_TAB__AMENITY: 'amenity',
      settingsTabSelected: ''
    };
  },
  methods: {},
  mounted() {
    this.settingsTabSelected = this.SETTINGS_TAB__ABOUT;
  },
  setup() {

  }
};
</script>

<style>

.top-action-container {
  flex-grow: 4;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.top-action-container .action {
  border: none;
}

.get-back-msg-container {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.get-back-icon {
  font-size: 3rem;
  line-height: 3rem;
}

.get-back-text {
  font-size: 1rem;
  line-height: 1rem;
  text-align: center;
}

.action {
  border: 2px solid var(--color-background-less);
}

.action-active {
  border: 2px solid var(--color-accent);
}

</style>
