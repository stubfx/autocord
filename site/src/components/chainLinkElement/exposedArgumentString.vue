<template>
  <div class="flex flex-row flex-wrap cursor-pointer gap-1">
    <chip v-for="arg in arguments" :text="arg"
          class="font-light bg-tertiary text-accent p-1 px-2 rounded mr-0.5 mt-1"
          @click="$emit('onArgumentClick', arg)"></chip>
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