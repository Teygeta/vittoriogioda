<script setup lang="ts">

const { data } = useFetch('/api/get-users')
</script>

<template>
  <main>
    <div>
      {{ data }}
    </div>
  </main>
</template>
