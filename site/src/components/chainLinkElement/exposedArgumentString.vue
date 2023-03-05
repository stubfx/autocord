<template>
  <div class="flex flex-row flex-wrap cursor-pointer gap-1">
          <chip class="font-light bg-tertiary text-accent p-1 px-2 rounded mr-0.5 mt-1" v-for="arg in arguments" :text="arg"></chip>
  </div>
</template>

<script>
import Chip from "../chips/chip.vue";

export default {
  name: "exposedArgumentString",
  components: {Chip},
  emits: ['onArgumentClick'],
  props: {
    arguments: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>