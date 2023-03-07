<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row flex-wrap" v-for="param in chainLink.params">
      <p>{{ param.name }}&nbsp;:&nbsp;</p>
      <p class="overflow-hidden overflow-ellipsis max-w-[200px]" v-html="formattedParamValue(param)"></p>
    </div>
  </div>
</template>

<script>
import {ChainLinkParam} from "../ParamTypes.js";

export default {
  name: "linkParamsViewBlock",
  props: {
    chainLink: Object
  },
  methods: {
    formattedParamValue(param) {
      let rtrn = ''
      if (param.type === ChainLinkParam.LIST) {
        param.value.forEach((el) => {
          rtrn += `${this.replaceString(el)},`
        })
      } else {
        //treat this as string.
        rtrn += this.replaceString(param.value)
      }
      return rtrn
    },
    replaceString(value){
      // watch out, channel_type === 0 will result in false when using !value
      if (value === null || value === undefined) {
        return `<span class="text-error">ERROR</span>`
      }
      // make sure is a string (could be a number for CHANNEL_TYPE).
      const str = `${value}`;
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