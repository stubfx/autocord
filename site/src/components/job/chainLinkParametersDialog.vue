<template>
  <simple-dialog ref="modal" @onClose="onClose">
    <form ref="form" class="flex flex-col w-[400px]">
      <template v-for="param in chainLink.acceptParams">
        <label>{{param}}</label>
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
  props: {
    chainLink: {
      acceptParams: [String]
    }
  },
  data() {
    return {
      params: []
    }
  },
  methods: {
    open() {
      console.log(this.chainLink);
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