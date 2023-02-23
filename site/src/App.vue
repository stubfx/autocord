<template>
  <div class="flex w-full justify-center flex-col items-center fixed overflow-y-auto absolute">
    <div class="flex w-screen justify-center bg-discord-5">
      <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>
    </div>
    <div class="container">
      <router-view></router-view>
<!--      <guilds-selector></guilds-selector>-->
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>
