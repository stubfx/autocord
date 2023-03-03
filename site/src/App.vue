<template>
  <div id="bg" class="absolute top-0 left-0 w-screen h-screen"></div>
  <div class="flex w-full h-full flex-col items-center absolute gap">
    <div class="absolute top-0 left-0 w-full">
      <app-container></app-container>
    </div>
    <div class="flex flex-grow w-full justify-center items-end gap">
      <h1 class="text-white my-5">Made with ❤️ by <a href="https://stubfx.com" target="_blank" class="text-discord-1">stubfx</a></h1>
    </div>
  </div>
</template>

<script setup>
import AppContainer from "./components/main/appContainer.vue";
</script>

<style scoped>
#bg {
  background-image: url("/src/assets/bg-sample.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
