<template>
  <div :data-type="type" @click="onClick()" class="group cursor-pointer p-5 bg-discord-2 rounded-xl
                   transition-colors duration-100
                   hover:bg-discord-1
                   data-[type=SAVE]:hover:bg-discord-success
                   data-[type=DELETE]:hover:bg-discord-error
                   data-[type=LOGIN]:hover:bg-discord-success">
    <div class="flex flex-row items-center h-full gap-2">
      <save_rounded class="fill-gray-400 w-10 group-hover:fill-black"
                    v-if="type==='SAVE'"></save_rounded>
      <close_rounded class="fill-gray-400 w-10 group-hover:fill-white"
                     v-if="type==='DELETE'"></close_rounded>
      <login_rounded class="fill-gray-400 w-10 group-hover:fill-black"
                     v-if="type==='LOGIN'"></login_rounded>
      <cancel_rounded class="fill-gray-400 w-10 group-hover:fill-white"
                     v-if="!type"></cancel_rounded>
      <div class="flex flex-col justify-center h-full">
        <span class="font-semibold text-white tracking-wide
                    group-data-[type=SAVE]:group-hover:text-black
                    group-data-[type=DELETE]:group-hover:text-white
                    group-data-[type=LOGIN]:group-hover:text-black">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Save_rounded from "../assets/save_rounded.vue";
import Close_rounded from "../assets/close_rounded.vue";
import Task_rounded from "../assets/task_rounded.vue";
import Login_rounded from "../assets/login_rounded.vue";
import Cancel_rounded from "../assets/cancel_rounded.vue";

export default {
  name: "simpleButton",
  components: {Cancel_rounded, Login_rounded, Task_rounded, Close_rounded, Save_rounded},
  emits: ['onClick'],
  props: {
    text: "NONE",
    type: "SAVE" | "DELETE" | "LOGIN"
  },
  methods: {
    onClick() {
      this.$emit("onClick")
    }
  }
}
</script>

<style scoped>

</style>