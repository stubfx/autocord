<template>
<!--  <div class="fixed top-0 left-0 w-full h-full bg-dark"></div>-->
<!--  <background-flare></background-flare>-->
  <div class="flex w-full h-full flex-col items-center absolute gap">
    <div class="w-full">
      <router-view></router-view>
    </div>
    <div class="flex flex-grow w-full justify-center items-end gap">
      <h1 class="text-accent my-5">Made with ❤️ by <a href="https://stubfx.com" target="_blank" class="text-accent">stubfx</a></h1>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>

</style>
