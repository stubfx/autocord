<template>
  <div class="flex flex-row flex-wrap cursor-pointer gap-1">
          <span class="font-light bg-darky text-accent p-1 px-2 rounded mr-0.5 mt-1" v-for="arg in arguments">
            <span @click="$emit('onArgumentClick', arg)">{{arg}}</span>
          </span>
  </div>
</template>

<script>
export default {
  name: "exposedArgumentString",
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