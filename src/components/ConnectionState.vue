<template>
  <div>
    {{ connected ? 'Connected' : 'Not Connected' }}
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { state } from '../socket'

  const connected = computed(() => {
    return state.connected
  })
</script>
