<template>
<span class="font-light bg-tertiary text-accent p-1 px-2 rounded mr-0.5 mt-1">
            <span>{{text}}</span>
          </span>
</template>

<script>
export default {
  name: "chip",
  props: {
    text: String
  }
}
</script>

<style scoped>

</style>