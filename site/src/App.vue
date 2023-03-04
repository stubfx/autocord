<template>
  <div id="bg" class="fixed top-0 left-0 w-full h-full"></div>
  <div class="flex w-full h-full flex-col items-center absolute gap">
    <div class="w-full py-5">
      <router-view></router-view>
    </div>
    <div class="flex flex-grow w-full justify-center items-end gap">
      <h1 class="text-white my-5">Made with ❤️ by <a href="https://stubfx.com" target="_blank" class="text-discord-1">stubfx</a></h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
#bg {
  background-image: url("/src/assets/bg-sample.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
