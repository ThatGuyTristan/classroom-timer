<template>
  <button :disabled="state.connected" @click="connect"> Connect </button>
  <button :disabled="!state.connected" @click="disconnect"> Disconnect </button>
</template>

<script setup>
import { socket, state } from '../socket';

const connect = () => {
  socket.connect();
}

const disconnect = () => {
  socket.disconnect();
}
</script>
