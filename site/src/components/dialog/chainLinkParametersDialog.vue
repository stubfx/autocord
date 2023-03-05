<template>
  <simple-dialog ref="modal" :close-on-click-outside="false">
<!--    <div class="grid grid-cols-4 max-w-[600px] gap">-->
<!--      <div class="flex flex-col">-->
<!--        <exposed-argument-string @on-argument-click="onArgClick" :arguments="exposedArguments"></exposed-argument-string>-->
<!--      </div>-->
      <div class="flex flex-col gap col-span-3 max-w-[400px]">
        <chain-link-element :link="chainLink" :expanded="true"></chain-link-element>
        <exposed-argument-string @on-argument-click="onArgClick" :arguments="exposedArguments"></exposed-argument-string>
        <div ref="form" class="flex flex-col w-[400px]">
          <template v-for="param in chainLink.params">
            <label class="my-2">{{ param.name }}</label>
            <div class="flex flex-row w-full gap">
              <input type="checkbox" v-model="param.forceString" v-if="!isString(param)">
              <input class="bg-secondary rounded p-2 w-full" type="text" v-model="param.value"
                     v-if="isStringOrForcedAs(param)" @click="setFocusedParam(param)"/>
              <select v-else-if="hasOptions(param)" v-model="param.value" class="bg-secondary rounded p-2 w-full">
                <option v-for="paramOption in getParamOptions(param)" :value="paramOption.value" class="bg-dark">{{
                    paramOption.name
                  }}
                </option>
              </select>
            </div>
          </template>
          <save-button class="self-center mt-5" @onClick="save()"></save-button>
        </div>
      </div>
<!--    </div>-->
  </simple-dialog>
</template>

<script>
import SimpleDialog from "./simpleDialog.vue";
import ChainLinkElement from "../chainLinkElement/chainLinkElement.vue";
import Save_rounded from "../../assets/save_rounded.vue";
import {ChainLinkParam} from "../../ParamTypes.js";
import {NetworkAdapter} from "../../network.js";
import Close_rounded from "../../assets/close_rounded.vue";
import SaveButton from "../buttons/saveButton.vue";
import {getExposedArgumentsInJob} from "../../../utils.js";
import ExposedArgumentString from "../chainLinkElement/exposedArgumentString.vue";

export default {
  name: "chainLinkParametersDialog",
  components: {ExposedArgumentString, SaveButton, Close_rounded, Save_rounded, ChainLinkElement, SimpleDialog},
  data() {
    return {
      exposedArguments: [],
      chainLink: {},
      textChannels: [],
      roles: [],
      focusedParam : null,
      onSaveCB: null
    }
  },
  emits: ['onClose'],
  methods: {
    open(job, chainLink, onSave) {
      this.onSaveCB = onSave
      this.exposedArguments = getExposedArgumentsInJob(job, this.$store.storage)
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
      let values = [
        // 'STRING',
        'CHANNEL_ID',
        'ROLE_ID',
        'CHANNEL_TYPE',
        'CATEGORY_ID',
        'REGEX',
        // 'NUMBER'
      ]
      // not forcestring nor one of the params above.
      return param.forceString || !values.includes(param.type)
    },
    isChannelOrCategoryID(type) {
      return type === ChainLinkParam.CHANNEL_ID || type === ChainLinkParam.CATEGORY_ID
    },
    isRoleID(type) {
      return type === ChainLinkParam.ROLE_ID
    },
    save() {
      if (this.onSaveCB) {
        this.onSaveCB()
      }
      this.close()
    },
    close() {
      this.$refs.modal.close()
      this.$emit("onClose")
    },
    setFocusedParam(param){
      this.focusedParam = param
    },
    onArgClick(arg){
      let argStr = `{{${arg}}}`
      if (this.focusedParam) {
        if (!this.focusedParam.value) {
          // prevents null{{test}}
          this.focusedParam.value = argStr
        } else {
          this.focusedParam.value += argStr
        }
      }
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
        switch (param.type) {
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