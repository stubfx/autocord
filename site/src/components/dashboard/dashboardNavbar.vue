<template>
  <div class="flex flex-row rounded gap">
    <!--      <simple-select></simple-select>-->
    <div class="flex flex-row fill-white [&>*]:cursor-pointer gap">
      <home-button @click="onPageChange(DASHBOARDPAGES.GUILD_SELECTION)"></home-button>
      <logout-button @on-click="onLogout"></logout-button>
    </div>
  </div>
</template>

<script>
import Home_rounded from "../../assets/home_rounded.vue";
import {DASHBOARDPAGES} from "../../pages.js";
import Logout_rounded from "../../assets/logout_rounded.vue";
import HomeButton from "../buttons/homeButton.vue";
import LogoutButton from "../buttons/logoutButton.vue";

export default {
  name: "dashboardNavbar",
  components: {LogoutButton, HomeButton, Logout_rounded, Home_rounded},
  emits: ['onLogout'],
  data() {
    return {
      userGuilds:[],
      page: DASHBOARDPAGES.GUILD_SELECTION,
      DASHBOARDPAGES: DASHBOARDPAGES
    }
  },
  methods: {
    onPageChange() {
      this.$emit('onPageChange', DASHBOARDPAGES.GUILD_SELECTION)
    },
    onLogout() {
      this.$emit('onLogout')
    }
  }
}
</script>

<style scoped>

</style>