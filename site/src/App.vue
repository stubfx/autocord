<template>
  <div class="flex w-full justify-center flex-col items-center overflow-y-auto absolute">
    <div class="flex w-full justify-center bg-discord-5 fixed top-0 left-0">
      <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>
    </div>
    <div class="container py-20">
      <router-view></router-view>
<!--      <guilds-selector></guilds-selector>-->
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>
