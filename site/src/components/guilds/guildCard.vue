<template>
  <div class="border-2 border-red-600 rounded">
    <object :data="getImageUrl()" type="image/png">
      <img src="https://cdn.discordapp.com/icons/394105661652205568/1b154cb0b2e19f2cceb0c7803bd94ae0.png" />
    </object>
    <h1>{{guild.name}}</h1>
  </div>
</template>

<script>
// "id": string //"80351110224678912",
// "name": string //"1337 Krew",
// "icon": string //"8342729096ea3675442027381ff50dfe",
// "owner": boolean //true,
// "permissions": string //"36953089",
// "features": Array<string> //["COMMUNITY", "NEWS"]
export default {
  name: "guildCard",
  props: {
    guild: Object
  },
  methods: {
    getImageUrl() {
      return `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png`
    }
  }
}
</script>

<style scoped>

</style>