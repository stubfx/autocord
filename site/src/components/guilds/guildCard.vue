<template>
  <div class="group rounded flex flex-col items-center p hover:shadow-default hover:-translate-y-6 transition-all duration-300 bg-tertiary cursor-pointer w-[200px]
  h-100 hover:scale-110 hover:bg-accent hover:text-dark">
    <object :data="getImageUrl()" type="image/png" class="rounded w-full h-auto" v-if="guild.icon">
    </object>
<!--    <object v-else data="/src/assets/broken_image_rounded.svg" type="image/png" class="rounded w-full h-auto fill-primary">-->
<!--      <img src="/src/assets/broken_image_rounded.svg"-->
<!--           class="rounded w-full h-auto"/>-->
<!--    </object>-->
    <div class="w-full h-full" v-else>
      <broken_image_rounded class="fill-primary group-hover:fill-black"></broken_image_rounded>
    </div>
    <div class="flex w-full flex-col items-center h-full justify-center">
      <h1 class="mt-3 px-2 text-2xl overflow-ellipsis">{{guild.name}}</h1>
    </div>
<!--    <div class="absolute flex flex-col h-full w-full justify-center items-center -z-10">-->
<!--      <div class="absolute bg-accent rounded group-hover:scale-[10] opacity-0 group-hover:opacity-100 transition-all duration-1000 w-20 h-20"></div>-->
<!--    </div>-->
  </div>
</template>

<script>
import Broken_image_rounded from "../../assets/broken_image_rounded.vue";

export default {
  name: "guildCard",
  components: {Broken_image_rounded},
  props: {
    guild: Object
  },
  methods: {
    getImageUrl() {
      return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png`
    },
  }
}
</script>

<style scoped>

</style>