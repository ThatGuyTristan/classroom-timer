<template>  
<div class="card">
  <div class="topDiv">
    <label for="text" placeholder="name"> Name </label>
    <input type="text" v-model="name" />
  </div>
  
  <div>
    <input type="number" label="minutes" min="0"  max="60" v-model="minutes" class="time-input"/>
    <input type="number" label="seconds" min="0" max="59" v-model="seconds" class="time-input"/>
  </div>
    <button class="button" :disabled="!name.trim()" @click="addTimer()"> Save </button> 
</div>
</template>

<script setup>
import { ref, computed, defineEmits } from "vue"

const emit = defineEmits(['emitAddTimer'])

const name = ref('');
const minutes = ref(0);
const seconds = ref(0);

const computedTime = computed(() => {
  return seconds.value + (minutes.value * 60)
})

const addTimer = () => {
  let timer = { name: name.value, count: computedTime.value }

  emit('emitAddTimer', timer)
  name.value = '';
  minutes.value = 0;
  seconds.value = 0;
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .card {
    padding: 10px;
    background-color: seagreen;
    height: auto;
    width: 90%;
    margin: 10px;
    margin-left: auto;
  } 
  .time-input {
    width: 100px;
    height: 80px;
    font-size: 75px;
    padding-left: 10px;
  }

  .top-div {
    margin-top: 5px;
  }

  input[type=number]::-webkit-inner-spin-button {
    display: none;
  }


}
</style>