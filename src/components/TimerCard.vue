<template>
  <div class="card">
    {{ timer.name }} -- {{  timer.id }}
  
    <div class="time-display">
      {{ timer.count }}
    </div>
    <div>
      <button @click="activateTimer"> Start </button>
      <button @click="pauseTimer"> Pause </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { socket } from "../socket";

const props = defineProps({
  timer: { 
    name: String,
    count: Number,
    id: Number,
    isPaused: Boolean
  }
})

const activateTimer = () => {
  console.log("Starting Timer");
  socket.emit('startTimer', props.timer.id);
}

const pauseTimer = () => {
  console.log("Pausing Timer");
  socket.emit('pauseTimer', props.timer.id);
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .card {
    background-color: teal;
    height: 200px;
    width: 100%;
    margin-top: 10px;
  } 

  .time-display { 
    width: 100px;
    height: 80px;
    font-size: 75px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>