<template>
  <div class="flex flex-col w-[400px] bg-discord-3 rounded appearance-none" @click="openSelect">
    <div v-for="item in dataSet" class="absolute flex flex-row w-full text-white" v-if="isOpen">
      <div class="bg-discord-error">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "simpleSelect",
  props: {
    dataSet: [{
      imageUrl: String | null,
      id: String,
      value: String
    }]
  },
  data() {
    return {
      isOpen : true
    }
  },
  mounted() {
    console.log(this.dataSet)
  },
  methods: {
    openSelect() {
      this.isOpen = true
    }
  }
}
</script>

<style scoped>

</style>