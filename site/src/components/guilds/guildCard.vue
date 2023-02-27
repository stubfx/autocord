<template>
  <div class="relative group rounded-2xl m-5 flex flex-col items-center p-3 hover:shadow-2xl hover:-translate-y-6 transition-all duration-300 bg-discord-5 cursor-pointer w-[200px]
  overflow-hidden h-100 hover:scale-110 hover:bg-discord-1 hover:text-discord-5"
  @click="selectGuild()">
    <object :data="getImageUrl()" type="image/png" class="rounded-2xl w-full h-auto" v-if="guild.icon">
    </object>
<!--    <object v-else data="/src/assets/broken_image_rounded.svg" type="image/png" class="rounded-2xl w-full h-auto fill-discord-2">-->
<!--      <img src="/src/assets/broken_image_rounded.svg"-->
<!--           class="rounded-2xl w-full h-auto"/>-->
<!--    </object>-->
    <div class="w-full h-full" v-else>
      <broken_image_rounded class="fill-discord-2 group-hover:fill-black"></broken_image_rounded>
    </div>
    <div class="flex w-full flex-col items-center h-full justify-center">
      <h1 class="mt-3 px-2 text-2xl overflow-ellipsis">{{guild.name}}</h1>
    </div>
<!--    <div class="absolute flex flex-col h-full w-full justify-center items-center -z-10">-->
<!--      <div class="absolute bg-discord-1 rounded-2xl group-hover:scale-[10] opacity-0 group-hover:opacity-100 transition-all duration-1000 w-20 h-20"></div>-->
<!--    </div>-->
  </div>
</template>

<script>
// "id": string //"80351110224678912",
// "name": string //"1337 Krew",
// "icon": string //"8342729096ea3675442027381ff50dfe",
// "owner": boolean //true,
// "permissions": string //"36953089",
// "features": Array<string> //["COMMUNITY", "NEWS"]
import {NetworkAdapter} from "../../network.js";
import Broken_image_rounded from "../../assets/broken_image_rounded.vue";
import {PAGES} from "../../pages.js";

export default {
  name: "guildCard",
  components: {Broken_image_rounded},
  props: {
    guild: Object
  },
  emits: ['onPageChange'],
  methods: {
    getImageUrl() {
      return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png`
    },
    selectGuild() {
      // check if the bot is in the guild.
      if (NetworkAdapter.openGuild(this.guild.id)) {
        this.$store.guildId = this.guild.id
        this.$emit('onPageChange',PAGES.JOB_LISTING)
      }
    }
  }
}
</script>

<style scoped>

</style>