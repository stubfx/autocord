<template>
  <div ref="bg" class="fixed justify-around items-center top-0 gap left-0 w-full h-full">
<!--    <div class="bg-accent w-20 h-20 animateme" v-for="item in getItems()"></div>-->
    <bg_wave class="absolute w-full h-auto bottom-0 fill-secondary"></bg_wave>
    <bg_wave class="absolute w-full h-auto bottom-0 fill-tertiary/60 -mb-3"></bg_wave>
  </div>
</template>

<script>
// import anime from "animejs";
import Bg_wave from "../assets/bg_wave.vue";

export default {
  name: "backgroundFlare",
  components: {Bg_wave},
  mounted() {
    // const staggerVisualizerEl = this.$refs.bg.$el;
    //
    // let animation = anime.timeline({
    //   targets: '.animateme',
    //   translateX: 270,
    //   // delay: anime.stagger(100),
    //   // autoplay: true,
    //   loop: true
    // })
    //
    // setTimeout(() => {
    //   animation.play()
    // }, 2000)
  },
  methods: {
    // getItems() {
    //   let items = []
    //   for (let i = 0; i < 200; i++) {
    //     items.push(1)
    //   }
    //   return items
    // }
  }
}
</script>

<style scoped>

</style>