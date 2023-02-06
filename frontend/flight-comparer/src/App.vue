<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="action-pane">


    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
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
  box-shadow: 0 0 10px 0 var(--white-least);
  display: flex;
  justify-content: center;
}

nav {
  align-self: flex-end;
}

nav a {
  margin: 0 1rem;
}
</style>
