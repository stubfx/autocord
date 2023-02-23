<template>
  <div class="flex bg-red"></div>
    <guild-card v-for="guild in guilds" :guild=guild></guild-card>
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