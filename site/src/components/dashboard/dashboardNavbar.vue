<template>
  <div class="flex flex-row rounded gap">
    <!--      <simple-select></simple-select>-->
    <div class="flex flex-row fill-white [&>*]:cursor-pointer gap">
      <list-button @click="onPageChange(DASHBOARDPAGES.GUILD_SELECTION)" v-if="currentPage !== DASHBOARDPAGES.GUILD_SELECTION"></list-button>
      <logout-button @on-click="onLogout"></logout-button>
      <support-server-button @on-click="supportServer"></support-server-button>
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

export default {
  name: "dashboardNavbar",
  components: {ListButton, SupportServerButton, LogoutButton, HomeButton, Logout_rounded},
  emits: ['onLogout'],
  props: {
    currentPage: String
  },
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
    },
    supportServer() {
      window.open('https://discord.gg/zG7RMmZj6U', "_blank")
    }
  }
}
</script>

<style scoped>

</style>