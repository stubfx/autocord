<template>
<div class="group relative flex flex-col flex-wrap overflow-hidden bg-discord-5 p-6 rounded-xl m-5 items-center shadow-2xl w-[400px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer
            justify-center min-h-[500px]">
  <add_rounded class="absolute rounded-full fill-discord-1 w-full transition-colors group-hover:fill-black z-10"></add_rounded>
  <add_rounded class="absolute rounded-full fill-discord-1 w-full transition-colors group-hover:scale-[20] transition-transform"></add_rounded>
</div>
</template>

<script>
import Add_rounded from "../../assets/add_rounded.vue";
import Task_rounded from "../../assets/task_rounded.vue";
import Psicology_rounded from "../../assets/psicology_rounded.vue";
import Sensor_rounded from "../../assets/sensor_rounded.vue";

export default {
  name: "guildJobAddCard",
  components: {Sensor_rounded, Psicology_rounded, Task_rounded, Add_rounded},
  data() {
    return {
      job: {
        chain: []
      }
    }
  }
}
</script>

<style scoped>

</style>