<template>
  <div class="fixed z-[99999] top-0 left-0 bg-discord-2 w-full h-full overflow-hidden cursor-pointer"
       v-if="isOpen" @click="onClose()">
    <!--  dialog-->
    <div class="absolute top-0 left-0 flex w-screen h-screen justify-center items-center">
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "simpleDialog",
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>