<template>
  <div class="flex flex-row flex-wrap">
          <span class="font-light bg-discord-4 text-white p-1 px-2 rounded-md mr-0.5 mt-1" v-for="arg in arguments">
<!--            {{link.acceptParams.join(", ")}}-->
            <span v-pre>{{</span>{{arg}}<span v-pre>}}</span>
          </span>
  </div>
</template>

<script>
export default {
  name: "exposedArgumentString",
  props: {
    arguments: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>