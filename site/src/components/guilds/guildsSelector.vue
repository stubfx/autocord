<template>
  <div class="py-24 sm:py-32 text-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Choose your server</h2>
        <p class="mt-2 text-lg leading-8">This is gonna be fun. Hopefully?</p>
      </div>
      <div
          class="mx-auto mt-16 flex flex-col items-center md:justify-center md:flex-row justify-items-stretch md:items-stretch">
        <guild-card v-for="guild in guilds" :guild=guild></guild-card>
      </div>
    </div>
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
import GuildCard from "./guildCard.vue";

export default {
  name: "guildsSelector",
  components: {GuildCard},
  data() {
    return {
      guilds: []
    }
  },
  async mounted() {
    this.guilds = await NetworkAdapter.getOwnedGuilds()
  }
}

</script>

<style scoped>

</style>