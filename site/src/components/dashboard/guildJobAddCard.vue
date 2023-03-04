<template>
<div class="group relative flex flex-col flex-wrap overflow-hidden bg-dark p-6 rounded items-center shadow-2xl opacity-50 hover:opacity-100 transition-opacity cursor-pointer
            justify-center min-h-[400px] job-bg w-job">
  <add_rounded class="max-w-[350px] absolute rounded-full fill-accent w-full transition-colors group-hover:fill-black z-10"></add_rounded>
  <add_rounded class="max-w-[350px] absolute rounded-full fill-accent w-full transition-colors group-hover:scale-[20] transition-transform"></add_rounded>
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