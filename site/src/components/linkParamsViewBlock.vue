<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row flex-wrap" v-for="param in chainLink.params">
      <p>{{ param.name }}&nbsp;:&nbsp;</p>
      <p class="overflow-hidden overflow-ellipsis max-w-[200px]" v-html="formattedParamValue(param.value)"></p>
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
        return `<span class="text-error">ERROR</span>`
      }
      const str = value;
      const regex = /\{\{(\w+)}}/g;

      return str.replace(regex, (match, variable) => {
        return `<span class="text-success">${variable}</span>`;
      });
    }
  }
}
</script>

<style scoped>

</style>