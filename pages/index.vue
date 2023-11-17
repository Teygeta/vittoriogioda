<script setup lang="ts">

const { data } = useFetch('/api/get-users')
</script>

<template>
  <div>
    <h1>Home</h1>
    <div>
      {{ data }}
    </div>
  </div>
</template>
