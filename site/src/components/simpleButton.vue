<template>
  <div class="group cursor-pointer p-5 bg-discord-2 rounded-xl hover:bg-discord-success
                   transition-colors duration-100" @click="onClick()">
    <div class="flex flex-row items-center">
      <save_rounded class="fill-gray-400 w-10 group-hover:fill-black"></save_rounded>
      <div class="flex flex-col ml-2">
        <span class="font-semibold text-white tracking-wide group-hover:text-black">save</span>
      </div>
    </div>
  </div>
</template>

<script>
import Save_rounded from "../assets/save_rounded.vue";

export default {
  name: "simpleButton",
  components: {Save_rounded},
  emits: ['onClick'],
  methods: {
    onClick() {
      this.$emit("onClick")
    }
  }
}
</script>

<style scoped>

</style>