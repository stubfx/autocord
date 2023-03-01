<template>
  <simple-dialog ref="modal" :close-on-click-outside="false">
    <div class="flex flex-col w-full">
      <chain-link-element :link="chainLink"></chain-link-element>
      <div ref="form" class="flex flex-col w-[400px]">
        <template v-for="param in chainLink.params">
          <label class="my-2">{{ param.name }}</label>
          <input class="bg-discord-3 rounded p-2" type="text" v-model="param.value" v-if="isString(param.type)"/>
          <select v-if="isChannelID(param.type)" v-model="param.value" class="bg-discord-3 rounded p-2">
            <option v-for="channel in textChannels" :value="channel.id" class="bg-discord-5">{{
                channel.name
              }}
            </option>
          </select>
          <select v-if="isRoleID(param.type)" v-model="param.value" class="bg-discord-3 rounded p-2">
            <option v-for="role in roles" :value="role.id" class="bg-discord-5">{{ role.name }}</option>
          </select>
        </template>
        <simple-button class="mt-5 w-fit self-center" @onClick="close()" text="save" type="SAVE"></simple-button>
      </div>
    </div>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import SimpleButton from "../simpleButton.vue";
import {ChainLinkParam} from "../../ParamTypes.js";
import {NetworkAdapter} from "../../network.js";
import Close_rounded from "../../assets/close_rounded.vue";

export default {
  name: "chainLinkParametersDialog",
  components: {Close_rounded, SimpleButton, Save_rounded, ChainLinkElement, SimpleDialog},
  data() {
    return {
      chainLink: {},
      textChannels: [],
      roles: []
    }
  },
  emits: ['onClose'],
  methods: {
    open(chainLink) {
      let textChannels
      let roles
      // map acceptParams to params, adding only if is not present yet.
      chainLink.acceptParams.forEach(value => {
        let found = chainLink.params.find(el => el.name === value.name)
        textChannels = textChannels || this.isChannelID(value.type)
        roles = roles || this.isRoleID(value.type)
        if (!found) {
          // param is not in the list, add it!
          chainLink.params.push({
            name: value.name,
            type: value.type,
            value: null
          })
        }
      })
      // at least one textChannel?
      if (textChannels) {
        this.loadTextChannels()
      }
      // at least one role?
      if (roles) {
        this.loadGuildRoles()
      }
      this.chainLink = chainLink
      this.$refs.modal.open()
    },
    async loadTextChannels() {
      let channels = await NetworkAdapter.getGuildChannels(this.$store.guildId);
      // only text channels in this case.
      this.textChannels = channels.filter(ch => ch.type === 0)
    },
    async loadGuildRoles() {
      this.roles = await NetworkAdapter.getGuildRoles(this.$store.guildId)
    },
    isString(type) {
      return type === ChainLinkParam.STRING
    },
    isChannelID(type) {
      return type === ChainLinkParam.CHANNEL_ID
    },
    isRoleID(type) {
      return type === ChainLinkParam.ROLE_ID
    },
    close() {
      this.$refs.modal.close()
      this.$emit("onClose")
    }
  }
}
</script>

<style scoped>

</style>