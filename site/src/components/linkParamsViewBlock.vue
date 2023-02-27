<template>
  <template v-for="param in chainLink.params">
    <p class="uppercase mt-2">{{param.name}}</p>
    <p class="bg-discord-3 rounded-md p-2" v-html="formattedParamValue(param.value)"></p>
  </template>
</template>

<script>
export default {
  name: "linkParamsViewBlock",
  props: {
    chainLink: Object
  },
  methods: {
    formattedParamValue(value) {
      if (!value) {
        return `<span class="text-discord-error">ERROR</span>`
      }
      const str = value;
      const regex = /\{\{(\w+)}}/g;

      return str.replace(regex, (match, variable) => {
        return `<span class="text-discord-success">${variable}</span>`;
      });
    }
  }
}
</script>

<style scoped>

</style>