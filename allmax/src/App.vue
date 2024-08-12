<script setup>
import Navbar from './components/NavigationBar.vue'; 
</script>

<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
  </div>
</template>



<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

  
</style>
