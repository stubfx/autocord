<template>
  <!--      <simple-select></simple-select>-->
  <div class="flex flex-col h-full fill-accent items-center pt-5 shadow-default">
    <div class="flex flex-col dashboard-navbar">
      <logout_rounded @click="onLogout" class="hover:bg-error hover:fill-accent"></logout_rounded>
<!--      <refresh_rounded @click="onRefresh"></refresh_rounded>-->
      <list_alt_rounded @click="onGuildSelection" class="hover:bg-accent hover:fill-dark"></list_alt_rounded>
      <!--      <back-button @click="onPageChange(DASHBOARDPAGES.JOB_LISTING)"></back-button>-->
      <!--      <refresh-button @click="onRefresh"></refresh-button>-->
      <icon_clyde @click="supportServer" class="hover:bg-primary hover:fill-accent"></icon_clyde>
    </div>
  </div>
</template>

<script>
import {DASHBOARDPAGES} from "../../pages.js";
import Logout_rounded from "../../assets/logout_rounded.vue";
import HomeButton from "../buttons/homeButton.vue";
import LogoutButton from "../buttons/logoutButton.vue";
import SupportServerButton from "../buttons/supportServerButton.vue";
import ListButton from "../buttons/listButton.vue";
import RefreshButton from "../buttons/refreshButton.vue";
import BackButton from "../buttons/backButton.vue";
import List_alt_rounded from "../../assets/list_alt_rounded.vue";
import Icon_clyde from "../../assets/icon_clyde.vue";
import Refresh_rounded from "../../assets/refresh_rounded.vue";

export default {
  name: "dashboardNavbar",
  components: {
    Refresh_rounded,
    Icon_clyde,
    List_alt_rounded,
    BackButton, RefreshButton, ListButton, SupportServerButton, LogoutButton, HomeButton, Logout_rounded
  },
  emits: ['onLogout', 'onRefresh'],
  props: {
    currentPage: String
  },
  data() {
    return {
      userGuilds: [],
      page: DASHBOARDPAGES.GUILD_SELECTION,
      DASHBOARDPAGES: DASHBOARDPAGES
    }
  },
  methods: {
    onGuildSelection() {
      this.$router.push({name: 'guilds'})
    },
    onLogout() {
      this.$emit('onLogout')
    },
    onRefresh() {
      this.$emit('onRefresh')
    },
    supportServer() {
      window.open('https://discord.gg/zG7RMmZj6U', "_blank")
    }
  }
}
</script>

<style scoped>
.dashboard-navbar {
  @apply w-[80px];
  @apply gap;
}

.dashboard-navbar > * {
  @apply cursor-pointer;
  @apply transition-colors;
  /*@apply hover:bg-accent;*/
  /*@apply hover:fill-dark;*/
  @apply p-4;
}
</style>