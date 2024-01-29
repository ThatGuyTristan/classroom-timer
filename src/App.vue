<template>
  <ConnectionManager> </ConnectionManager>
  <ConnectionState />
  <Timers />
</template>

<script setup>
import ConnectionManager from "./components/ConnectionManager.vue"
import ConnectionState from "./components/ConnectionState.vue"
import Timers from "./components/Timers.vue"
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
