import { reactive } from "vue";
import { io } from "socket.io-client"

export const state = reactive({
  connected: false, 
})

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL, {
  autoConnect: true
})

socket.on("connect", () => {
  state.connected = true;
})

socket.on("testEmit", (x) => {
  console.log("X:", x);
})

socket.on("connect_error", () => {
  console.log("weee");
})

socket.on("disconnect", () => {
  state.connected = false;
})

socket.on("addTimer", (...args) => {
  console.log('here', args)
  let newTimer = {
    id: state.timers.length + 1000,
    time: args.time
  }
  state.timers.push(newTimer)
})

socket.on('pauseTimer', (args) => {
  console.log('pauseTimer args: ', args)
})

socket.on('stopTimer', (args) => {
  console.log('stopTimer args: ', args)
})


