<template>
  <simple-dialog ref="modal" :close-on-click-outside="false">
    <div class="flex flex-col w-full">
      <chain-link-element :link="chainLink"></chain-link-element>
      <div ref="form" class="flex flex-col w-[400px]">
        <template v-for="param in chainLink.params">
          <label class="my-2">{{ param.name }}</label>
          <div class="flex flex-row w-full gap">
            <input type="checkbox" v-model="param.forceString" v-if="!isString(param)">
            <input class="bg-discord-3 rounded p-2 w-full" type="text" v-model="param.value"
                   v-if="isStringOrForcedAs(param)"/>
            <select v-else-if="hasOptions(param)" v-model="param.value" class="bg-discord-3 rounded p-2 w-full">
              <option v-for="paramOption in getParamOptions(param)" :value="paramOption.value" class="bg-discord-5">{{
                  paramOption.name
                }}
              </option>
            </select>
          </div>
        </template>
        <save-button class="self-center mt-5" @onClick="close()"></save-button>
      </div>
    </div>
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import ChainLinkElement from "../chainLinkElement.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import {ChainLinkParam} from "../../ParamTypes.js";
import {NetworkAdapter} from "../../network.js";
import Close_rounded from "../../assets/close_rounded.vue";
import SaveButton from "../buttons/saveButton.vue";

export default {
  name: "chainLinkParametersDialog",
  components: {SaveButton, Close_rounded, Save_rounded, ChainLinkElement, SimpleDialog},
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
      let channelId
      let roles
      // map acceptParams to params, adding only if is not present yet.
      chainLink.acceptParams.forEach(value => {
        let found = chainLink.params.find(el => el.name === value.name)
        channelId = channelId || this.isChannelOrCategoryID(value.type)
        roles = roles || this.isRoleID(value.type)
        if (!found) {
          // if there are options, make sure they are all strings.
          if (value.options) {
            value.options = value.options.map(el => {
              el.value = el.value.toString()
              return el
            })
          }
          // param is not in the list, add it!
          chainLink.params.push({
            name: value.name,
            type: value.type,
            options: value.options,
            value: null
          })
        }
      })
      // at least one textChannel?
      if (channelId) {
        this.loadChannelIds()
      }
      // at least one role?
      if (roles) {
        this.loadGuildRoles()
      }
      this.chainLink = chainLink
      this.$refs.modal.open()
    },
    async loadChannelIds() {
      let channels = await NetworkAdapter.getGuildChannels(this.$store.guildId);
      this.textChannels = channels.map(el => {
        el.value = el.id
        return el
      })
    },
    async loadGuildRoles() {
      let roles = await NetworkAdapter.getGuildRoles(this.$store.guildId)
      this.roles = roles.map(el => {
        el.value = el.id
        return el
      })
    },
    isString(param) {
      return !this.hasOptions(param)
    },
    isStringOrForcedAs(param) {
      return param.forceString || param.type === ChainLinkParam.STRING
    },
    isChannelOrCategoryID(type) {
      return type === ChainLinkParam.CHANNEL_ID || type === ChainLinkParam.CATEGORY_ID
    },
    isRoleID(type) {
      return type === ChainLinkParam.ROLE_ID
    },
    close() {
      this.$refs.modal.close()
      this.$emit("onClose")
    },
    hasOptions(param) {
      switch (param.type) {
        case ChainLinkParam.CHANNEL_ID:
        case ChainLinkParam.CATEGORY_ID:
        // case ChainLinkParam.CHANNEL_TYPE:
        case ChainLinkParam.ROLE_ID:
          return true
      }
      // are there options?
      return !!param.options
    },
    getParamOptions(param) {
      // let options = [
      // {
      //  name: #general,
      //    value: '3213213122313131'
      // }
      // ]
      if (this.isChannelOrCategoryID(param.type)) {
        switch (param.type){
          case ChainLinkParam.CHANNEL_ID:
            return this.textChannels.filter(ch => ch.type === 0)
          case ChainLinkParam.CATEGORY_ID:
            return this.textChannels.filter(ch => ch.type === 4)
          default:
            throw new Error('Type error.')
        }
      }
      if (param.type === ChainLinkParam.ROLE_ID) {
        return this.roles
      }
      // check if it has options then
      if (param.options) {
        return param.options
      }
    }
  }
}
</script>

<style scoped>

</style>