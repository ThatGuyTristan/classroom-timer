import { createServer } from "http"
import { Server } from "socket.io"

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8080'
  }
})

// Timer = { id: Number, count: Number, isPaused: Boolean, name: String }
let timers = []

const findTimerIndexById = (id) => {
  const timerById = (timer) => { return timer.id == id }
  const timerIndex = timers.findIndex(timerById)
  return timerIndex
}

//TODO: create a function to loop through unpaused timers and decrement counter 

const startTimer = (timer) => {
  if(timer.isPaused){
    return;
  }
  let count = timer.count
  const activeTimer = setInterval(function() {
    if(timer.isPaused) {
      if(count != timer.count) { 
        updateTimerCount(timer.id, count)
      }
      return;
    }

    count--;
    if(count === 0){
      clearInterval(activeTimer);
    }
  }, 1000);
}

const createTimer = (timer) => {
  timer.id = timers.length + 1000, 
  timer.isPaused = true 
  return timer
}

////////////////////////////////////////////////////
io.on("connection", (socket) => {
  console.log("a new connection has started...");

  socket.on('fetchTimersFromServer', (callback) => {
    callback({data: timers})
  })

  socket.on('sendTimerToServer', (timer) => {
    let createdTimer = createTimer(timer)
    timers.push(createdTimer)
    socket.emit('recieveTimerFromServer', { timer: createdTimer })
  })

  socket.on('startTimer', (id) => {
    let timer = findTimer(id);
    if(!timer) return;

    startTimer(timer);
    io.emit('updateTimer', timer);
  }),

  socket.on('pauseTimer', (id) => {
    // TODO: Combine these two into one function
    let timer = findTimer(id)
    let timerIndex = findTimerIndexById(id)

    timer.isPaused = true
    timers[timerIndex] = timer;
  })

  socket.on('resumeTimer', (id) => {
    let timer = findTimer(id);
    let timerIndex = findTimerIndexById(id);
    timer.isPaused = false;
    timers[timerIndex] = timer;
  })
})

const findTimer = (id) => {
  const timer = timers.find((t) => { return t.id === id });
  return timer;
}

const updateTimerCount = (id, amount) => {
  const timer = findTimer(id);
  const timerIndex = findTimerIndexById(id);
  
  timer.count = amount;
  timers[timerIndex] = timer;  
}

httpServer.listen(3000);
