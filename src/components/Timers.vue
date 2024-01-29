<template>
  <TimerCard v-for="timer in computedTimers" :key="timer.id" :timer="timer" />
  <AddTimerCard @emitAddTimer="addTimer"/>
</template>

<script setup>
import { socket } from '../socket';
import { ref, onMounted, computed } from 'vue'

import TimerCard from "./TimerCard.vue"
import AddTimerCard from "./AddTimerCard.vue";

const timers = ref([])

const computedTimers = computed(() => {
  return timers.value
})

const addTimer = (timer) => {
  socket.emit('sendTimerToServer', timer)
}

onMounted(() => {
  socket.emit('fetchTimersFromServer', (res) => {
    if(res.data) {
      timers.value = (res.data)
    }
  })
})

socket.on('recieveTimerFromServer', (timer) => {
  timers.value.push(timer)
})

socket.on('sendTimersToClient', (timers) => {
  setTimers(timers)
})

const setTimers = (timers) => {
  timers.value = timers;
}

socket.on('updateTimer', (timer) => {
  console.log("updating Timer on client side, ", timer)
})
</script>
