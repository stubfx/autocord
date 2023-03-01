<template>
  <div class="flex flex-col p-6 py-3">
    <h1 class="text-white text-5xl">{{name}}</h1>
    <div class="grid sm: grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 auto-cols-fr mt-5 items-center gap grid-flow-row-dense
                auto-rows-fr">
        <chain-link-element :link="item" @click="onItemSelected(item)" v-for="item in items"></chain-link-element>
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