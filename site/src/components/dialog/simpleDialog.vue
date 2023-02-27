<template>
  <div class="fixed z-[99999] top-0 left-0 bg-discord-2 w-full h-full overflow-hidden cursor-pointer"
       v-if="isOpen" @click="onClickOutside()">
    <!--  dialog-->
    <div class="absolute top-0 left-0 flex w-screen h-screen justify-center items-center">
      <div class="flex flex-col bg-discord-5 p-5 rounded-xl text-white" @click.stop>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "simpleDialog",
  props: {
    closeOnClickOutside: true
  },
  emits: ['onClose'],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    onClickOutside() {
      if (this.closeOnClickOutside) {
        this.close()
      }
    },
    close() {
      this.isOpen = false
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>