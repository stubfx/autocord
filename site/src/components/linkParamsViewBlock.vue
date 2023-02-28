<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row w-full" v-for="param in chainLink.params">
      <span>{{ param.name }}&nbsp;:&nbsp;</span>
      <span class="" v-html="formattedParamValue(param.value)"></span>
    </div>
  </div>
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