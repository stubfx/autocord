<template>
  <div class="fixed z-[99999] top-0 left-0 bg-black opacity-90 w-full h-full overflow-hidden"
       v-if="isOpen" @click="onClickOutside()">
<!--    this is just for the background-->
  </div>
  <div class="fixed z-[99999] top-0 left-0 w-full h-full overflow-hidden"
       v-if="isOpen" @click="onClickOutside()">
    <!--  dialog-->
    <div class="absolute top-0 left-0 flex w-screen h-screen justify-center items-center">
      <div class="flex flex-col bg-dark p rounded text-accent gap" @click.stop>
        <div class="flex flex-row w-full items-center">
          <h1 class="flex-grow uppercase text-accent text-2xl">{{title}}</h1>
          <close_rounded class="fill-accent bg-error rounded w-7 h-7 cursor-pointer"
                         @click="onCancel()" v-show="!hideCloseButton"></close_rounded>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Close_rounded from "../../assets/close_rounded.vue";

export default {
  name: "simpleDialog",
  components: {Close_rounded},
  props: {
    title: {
      type: String
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    }
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
      if (this.$props.closeOnClickOutside) {
        this.close()
      }
    },
    onCancel() {
      this.close()
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