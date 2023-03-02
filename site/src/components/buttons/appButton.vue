<template>
  <div @click="onClick()" class="group cursor-pointer p rounded transition-colors duration-100
                   w-fit">
    <div class="flex flex-row items-center h-full gap-2">
      <div class="w-[50px]">
        <slot></slot>
      </div>
      <div class="flex flex-col justify-center h-full">
        <span class="font-semibold tracking-wide">{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Cancel_rounded from "../../assets/cancel_rounded.vue";
import Login_rounded from "../../assets/login_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Close_rounded from "../../assets/close_rounded.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import Icon_clyde from "../../assets/icon_clyde.vue";

export default {
  name: "appButton",
  components: {Icon_clyde, Cancel_rounded, Login_rounded, Task_rounded, Close_rounded, Save_rounded},
  emits: ['onClick'],
  props: {
    text: "NONE",
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