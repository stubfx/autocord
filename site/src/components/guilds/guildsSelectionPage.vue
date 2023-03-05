<template>
  <div class="flex flex-col text-accent h-full w-full items-center">
    <h2 class="text-3xl font-bold tracking-tight">Choose your server</h2>
    <p class="mt-2 text-lg leading-8">This is gonna be fun. Hopefully?</p>
    <div class="mt-16 flex flex-row flex-wrap justify-center items-center items-stretch gap">
      <guild-card v-for="guild in guilds" :guild=guild @click="onGuildSelection(guild)"></guild-card>
    </div>
  </div>
</template>

<script>

import GuildCard from "./guildCard.vue";
import {NetworkAdapter} from "../../network.js";
import {openPopup} from "../../../popup.js";

export default {
  name: "guildsSelector",
  components: {GuildCard},
  data() {
    return {
      guilds: this.$store.guilds || []
    }
  },
  async mounted() {
    this.guilds = await NetworkAdapter.getOwnedGuilds()
    this.$store.guilds = this.guilds
  },
  methods: {
    goToListingPage() {
      this.$store.guildId = guild.id
      this.$router.push({name: 'jobs', params: {guildId: guild.id}})
    },
    async onGuildSelection(guild) {
      // check if the bot is in the guild.
      if (await NetworkAdapter.isBotInGuild(this.guild.id)) {
        this.goToListingPage(guild)
      } else {
        // if not, make it join!
        let url = await NetworkAdapter.getDiscordBotInviteUrl(this.guild.id)
        await openPopup(url)
        if (await NetworkAdapter.isBotInGuild(this.guild.id)) {
          this.goToListingPage(guild)
        }
      }
    }
  }
}

</script>

<style scoped>

</style>