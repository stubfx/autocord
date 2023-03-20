<template>
  <div class="flex flex-col p-6 py-3 gap">
    <h1 class="text-accent text-5xl">{{name}}</h1>
<!--    <div class="grid lg:grid-cols-1 xl:grid-cols-2 auto-cols-fr mt-5 items-center gap grid-flow-row-dense-->
<!--                auto-rows-fr">-->
    <div class="flex flex-col gap">
<!--    <div class="grid auto-rows-fr grid-flow-col gap">-->
        <chain-link-element
          :link="item"
          @click="onItemSelected(item)"
          @mouseover="onItemHover(item)"
          v-for="item in items"
          :expanded="false">
        </chain-link-element>
    </div>
  </div>
</template>

<script>
import ChainLinkElement from "../chainLinkElement/chainLinkElement.vue";

export default {
  name: "eventListSelection",
  components: {ChainLinkElement},
  props: {
    name: String,
    items: Array
  },
  emits: ['onItemSelected', 'onItemHover'],
  methods: {
    onItemSelected(item) {
      this.$emit("onItemSelected", item)
    },
    onItemHover(item) {
      this.$emit("onItemHover", item)
    }
  }
}
</script>

<style scoped>

</style>