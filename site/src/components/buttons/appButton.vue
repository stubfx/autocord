<template>
<!--  this is just to override settings coming from other buttons.-->
<!--  bg-transparent hover:bg-transparent-->
  <div @click="onClick()" class="group cursor-pointer p-1 rounded transition-colors duration-100
                   w-fit h-fit bg-secondary text-accent fill-accent hover:bg-accent hover:fill-secondary hover:text-secondary px-3">
    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-col items-center justify-center button-icon">
        <slot></slot>
      </div>
      <div class="flex flex-col justify-center font-semibold tracking-wide ml-2" v-if="text">
        {{ text }}
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