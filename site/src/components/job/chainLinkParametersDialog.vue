<template>
  <simple-dialog ref="modal" @onClose="onClose">
    <form ref="form" class="flex flex-col w-[400px]">
      <template v-for="param in chainLink.params">
        <label>{{param.name}}</label>
        <input class="bg-discord-3 rounded-md" type="text" v-model="param.value"/>
      </template>
    </form>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "../simpleDialog.vue";

export default {
  name: "chainLinkParametersDialog",
  components: {SimpleDialog},
  data() {
    return {
      chainLink : {}
    }
  },
  methods: {
    open(chainLink) {
      console.log(chainLink)
      chainLink.acceptParams.forEach(value => {
        chainLink.params.push({
          name: value,
          value: null
        })
      })
      this.chainLink = chainLink
      this.$refs.modal.open()
    },
    onClose() {
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>