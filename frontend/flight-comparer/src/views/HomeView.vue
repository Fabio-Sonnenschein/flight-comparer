<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
let map;

export default {
  mounted() {
    map = L.map('map').setView([23.725011735951796, 13.0078125], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    fetch("http://127.0.0.1:8080/airport/all")
        .then(async (response) => {
          const data = await response.json();
          displayAirports(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }
}

function displayAirports(airportList) {
  for (let airport of airportList) {
    let marker = L.marker([airport.position.latitude, airport.position.longitude]).addTo(map);
    marker.bindPopup(`<b>${airport.code}</b> - ${airport.name}<br>${airport.location.city}, ${airport.location.country}`);
  }
}
</script>

<style scoped>
.map-container {
  height: calc(100vh - 4rem);
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px -7px var(--black-least);
}

#map {
  width: 100%;
  height: 100%;
}
</style>
