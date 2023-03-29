<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data: function() {
    return {
    }
  },
  computed: {
    homeViewSelected() {
      return this.$route.name === 'home';
    }
  }
}
</script>

<template>
  <div class="action-pane">
    <div class="action-container">
      <div class="search-container">
        <div class="search-input-container" v-if="homeViewSelected">
          <span class="icon search-icon">search</span>
          <input type="text" class="input input--text search-input" id="search-input" placeholder="Search for an airport or flight">
        </div>
        <div class="search-output" v-if="homeViewSelected">

        </div>
      </div>
      <div class="action" v-if="homeViewSelected">
        <span class="icon action-icon">airplane_ticket</span>
        <p class="action-text">Add Flight</p>
      </div>
      <div class="action" v-if="homeViewSelected">
        <span class="icon action-icon">explore</span>
        <p class="action-text">Create Trip</p>
      </div>
      <RouterLink
            to="/about"
            custom
            v-slot="{ navigate }"
            v-if="homeViewSelected">
        <div class="action" @click="navigate" role="link">
          <span class="icon action-icon">info</span>
          <p class="action-text">About</p>
        </div>
      </RouterLink>
      <RouterLink
            to="/"
            custom
            v-slot="{ navigate }"
            v-if="!homeViewSelected">
        <div class="action" @click="navigate" role="link">
          <span class="icon action-icon">home</span>
          <p class="action-text">Home</p>
        </div>
      </RouterLink>
    </div>
  </div>

  <RouterView />
</template>

<style scoped>

.action-pane {
  background-color: var(--color-background);
  height: calc(100vh - 4rem - 32px);
  margin: 2rem 0;
  border-radius: 16px;
  padding: 16px;
  text-align: left;
  font-size: 1rem;
  box-shadow: 0 0 10px 0 var(--color-background-least);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.action-container {
  flex-grow: 4;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.search-container {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
}

.search-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--color-background-less);
  border-radius: .5rem;
}

.search-icon {
  margin: 1rem;
}

.search-input {
  background: transparent;
  border: none;
  flex-grow: 2;
  padding-right: 1rem;
  height: 100%;
  outline: none;
  font-size: 1.3rem;
  color: var(--color-text);
  border-radius: .5rem;
}

.search-output {
  flex-grow: 4;
  padding: 1rem 0 2rem;
}

.action {
  position: relative;
  width: 100%;
  background: var(--color-background-less);
  border-radius: .5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.action:last-of-type {
  margin-bottom: 0;
}

.action-icon {
  margin: .9rem 1rem 1rem;
}

.action-text {
  text-transform: uppercase;
  letter-spacing: .15rem;
  user-select: none;
}
</style>
