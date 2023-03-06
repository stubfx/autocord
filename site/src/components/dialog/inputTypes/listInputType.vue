<template>
  <div class="flex flex-col w-full gap">
    <div class="flex flex-row gap">
      <input class="bg-secondary rounded p-2 w-full" type="text" v-model="currentValue">
      <add_rounded class="w-token fill-accent bg-primary rounded cursor-pointer" @click="addListItem"></add_rounded>
    </div>
    <div class="flex flex-row flex-wrap">
      <chip class="hover:bg-error cursor-pointer" v-for="(item, index) in list" :text="item" @click="removeItem(index)"></chip>
    </div>
  </div>
</template>

<script>
import Chip from "../../chips/chip.vue";
import Add_rounded from "../../../assets/add_rounded.vue";

export default {
  name: "listInputType",
  components: {Add_rounded, Chip},
  props: {
    list: Object
  },
  data() {
    return {
      currentValue: ''
    }
  },
  methods: {
    addListItem() {
      if (this.currentValue && this.$props.list.length < 20) {
        this.$props.list.push(this.currentValue)
        this.currentValue = ''
        this.$forceUpdate()
      }
    },
    removeItem(index){
      this.$props.list.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>