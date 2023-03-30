<template>
  <div class="view-root">
    <div class="action-pane">
      <div class="get-back-msg-container">
        <span class="icon get-back-icon">public</span>
        <p class="get-back-text">Ready to plan a trip around the world?</p>
      </div>
      <div class="action-container">
        <RouterLink
            to="/"
            custom
            v-slot="{ navigate }">
          <div class="action" @click="navigate" role="link">
            <span class="icon action-icon">home</span>
            <p class="action-text">Home</p>
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="about content-pane">
      <div class="about-container">
        <div class="about-content">
          <h1 class="header">Flight Comparer</h1>
          <p>
            Visit the <a href="https://github.com/Fabio-Sonnenschein/flight-comparer" target="_blank" rel="noopener noreferrer">GitHub Repository</a> for more information.<br>
            This project is licensed under the <a href="https://github.com/Fabio-Sonnenschein/flight-comparer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.
          </p>
        </div>
        <div class="about-content">
          <h2 class="header">Open Source<br>Software</h2>
          <div>
            <p>
              <a href="https://github.com/Leaflet/Leaflet" target="_blank" rel="noopener noreferrer">Leaflet</a> ( <a href="https://github.com/Leaflet/Leaflet/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
              <a href="https://github.com/vuejs/core" target="_blank" rel="noopener noreferrer">Vue</a> ( <a href="https://github.com/vuejs/core/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
              <a href="https://github.com/golang/go" target="_blank" rel="noopener noreferrer">Go</a> ( <a href="https://github.com/golang/go/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
              <a href="https://github.com/gin-gonic/gin" target="_blank" rel="noopener noreferrer">Gin</a> ( <a href="https://github.com/gin-gonic/gin/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
              <a href="https://github.com/mongodb/mongo-go-driver" target="_blank" rel="noopener noreferrer">MongoDB Go Driver</a> ( <a href="https://github.com/mongodb/mongo-go-driver/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
              <a href="https://fonts.google.com/icons?icon.set=Material+Symbols" target="_blank" rel="noopener noreferrer">Material Symbols</a> ( <a href="https://github.com/google/material-design-icons/blob/master/LICENSE" target="_blank" rel="noopener norefferer">License</a> )
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.get-back-msg-container {
  flex-grow: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.get-back-icon {
  font-size: 15rem;
  line-height: 15rem;
}

.get-back-text {
  font-size: 2rem;
  line-height: 2.75rem;
  text-align: center;
}

.about {
  background: var(--color-background) url("@/assets/greenlandBackground_flip.jpg") no-repeat;
  background-position: bottom left;
  background-size: cover;
}

.about-container {
  height: calc(100vh - 4rem - 32px);
  width: 100%;
  padding: 16px 2rem;
  background: linear-gradient(90deg, var(--color-background-gradient-df) 10%, var(--color-background-gradient-00) 70%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.about-content {
  width: 100%;
  margin-bottom: 7rem;
}

.about-content:last-of-type {
  margin-bottom: 0;
}

.about-content p {
  font-size: 1.2rem;
}

.header {
  color: var(--color-heading);
  font-size: 4rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .8rem;
  margin: 0;
  padding: 0 0 .7rem 0;
  line-height: 5rem;
}
</style>
