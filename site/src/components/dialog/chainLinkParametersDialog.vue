<template>
  <simple-dialog ref="modal" :close-on-click-outside="false">
    <chain-link-element :link="chainLink"></chain-link-element>
    <form ref="form" class="flex flex-col w-[400px] mt-2">
      <template v-for="param in chainLink.params">
        <label class="uppercase mt-2">{{param.name}}</label>
        <input class="bg-discord-3 rounded-md p-2" type="text" v-model="param.value"/>
      </template>
      <simple-button class="mt-5 w-fit self-center" @onClick="close()" text="save" type="SAVE"></simple-button>
    </form>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import SimpleButton from "../simpleButton.vue";

export default {
  name: "chainLinkParametersDialog",
  components: {SimpleButton, Save_rounded, ChainLinkElement, SimpleDialog},
  data() {
    return {
      chainLink : {}
    }
  },
  emits: ['onClose'],
  methods: {
    open(chainLink) {
      // map acceptParams to params, adding only if is not present yet.
      chainLink.acceptParams.forEach(value => {
        let found = chainLink.params.find(el => el.name === value)
        if (!found) {
          // param is not in the list, add it!
          chainLink.params.push({
            name: value,
            value: null
          })
        }
      })
      this.chainLink = chainLink
      this.$refs.modal.open()
    },
    close() {
      this.$refs.modal.close()
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>