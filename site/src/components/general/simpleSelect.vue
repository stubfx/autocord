<template>
  <div class="flex flex-col w-[400px] bg-secondary rounded appearance-none" @click="openSelect">
    <div v-for="item in dataSet" class="absolute flex flex-row w-full text-accent" v-if="isOpen">
      <div class="bg-error">
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