<template>
  <div class="py-24 sm:py-32 text-white">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Choose your server</h2>
        <p class="mt-2 text-lg leading-8">This is gonna be fun. Hopefully?</p>
      </div>
      <div
          class="mx-auto mt-16 flex flex-col items-center md:justify-center md:flex-row justify-items-stretch md:items-stretch">
        <div v-if="!guilds || guilds.length < 1" class="text-9xl animate-spin">🥰</div>
        <guild-card v-for="guild in guilds" :guild=guild @on-page-change="onPageChange"></guild-card>
      </div>
    </div>
  </div>
</template>

<script>

import GuildCard from "./guildCard.vue";
import {NetworkAdapter} from "../../network.js";

export default {
  name: "guildsSelector",
  emits: ['onPageChange'],
  components: {GuildCard},
  data() {
    return {
      guilds: []
    }
  },
  async mounted() {
    this.guilds = await NetworkAdapter.getOwnedGuilds()
  },
  methods: {
    onPageChange(page) {
      this.$emit('onPageChange',page)
    }
  }
}

</script>

<style scoped>

</style>