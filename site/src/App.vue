<template>
  <div class="flex w-full h-full flex-col items-center absolute">
    <div class="flex w-full justify-center bg-discord-5 fixed top-0 left-0 z-[999999]">
      <h1 class="text-2xl font-bold text-discord-1 my-3">AUTOCORD.IO</h1>
    </div>
    <div class="container py-20 flex-grow mt-3">
      <app-container></app-container>
    </div>
    <div class="flex w-full justify-center">
      <h1 class="text-white my-3">Made with ❤️ by <a href="https://stubfx.com" target="_blank" class="text-discord-1">stubfx</a></h1>
    </div>
  </div>
</template>

<script setup>
import AppContainer from "./components/main/appContainer.vue";
</script>

<style scoped>
</style>
