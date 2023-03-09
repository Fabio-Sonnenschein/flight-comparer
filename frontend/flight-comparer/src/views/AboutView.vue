<template>
  <div class="about">
    <div class="about-container">
      <div class="about-content">
        <h1 class="header">Flight Comparer</h1>
        <p>
          Visit the <a href="https://github.com/Fabio-Sonnenschein/flight-comparer" target="_blank" rel="noopener noreferrer">GitHub Repository</a> for more information.<br>
          This project is licensed under the <a href="https://github.com/Fabio-Sonnenschein/flight-comparer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.
        </p>
      </div>
      <div class="about-content">
        <h2 class="header">Open Source Software</h2>
        <div>
          <p>
            <a href="https://github.com/Leaflet/Leaflet" target="_blank" rel="noopener noreferrer">Leaflet</a> ( <a href="https://github.com/Leaflet/Leaflet/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
            <a href="https://github.com/vuejs/core" target="_blank" rel="noopener noreferrer">Vue</a> ( <a href="https://github.com/vuejs/core/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
            <a href="https://github.com/golang/go" target="_blank" rel="noopener noreferrer">Go</a> ( <a href="https://github.com/golang/go/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
            <a href="https://github.com/gin-gonic/gin" target="_blank" rel="noopener noreferrer">Gin</a> ( <a href="https://github.com/gin-gonic/gin/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )<br>
            <a href="https://github.com/mongodb/mongo-go-driver" target="_blank" rel="noopener noreferrer">MongoDB Go Driver</a> ( <a href="https://github.com/mongodb/mongo-go-driver/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">License</a> )
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.about {
  height: calc(100vh - 4rem);
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  background: var(--color-background) url("@/assets/greenlandBackground_flip.jpg") no-repeat;
  background-position: bottom left;
  background-clip: text;
  background-size: cover;
  box-shadow: 0 0 10px 0 var(--color-background-least);
}

.about-container {
  height: calc(100vh - 4rem - 32px);
  width: 100%;
  padding: 16px;
  background: linear-gradient(90deg, var(--color-background-gradient-df) 10%, var(--color-background-gradient-00) 70%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.about-content {
  margin-bottom: 2rem;
}

.about-content:last-of-type {
  margin-bottom: 0;
}

.header {
  margin-bottom: 0;
  color: var(--color-heading);
}
</style>
