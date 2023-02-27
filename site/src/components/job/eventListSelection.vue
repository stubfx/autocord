<template>
  <div class="flex flex-col p-6 py-3">
    <h1 class="text-white text-5xl">{{name}}</h1>
    <div class="flex flex-row flex-wrap mt-5 items-center">
      <div class="flex-wrap m-2" v-for="item in items">
        <chain-link-element :link="item" @click="onItemSelected(item)"></chain-link-element>
      </div>
    </div>
  </div>
</template>

<script>
import ChainLinkElement from "../chainLinkElement.vue";

export default {
  name: "eventListSelection",
  components: {ChainLinkElement},
  props: {
    name: String,
    items: Array
  },
  emits: ['onItemSelected'],
  methods: {
    onItemSelected(item) {
      this.$emit("onItemSelected", item)
    }
  }
}
</script>

<style scoped>

</style>