<template>
  <div class="h-full job-bg z-20 overflow-x-hidden rounded p-6" v-if="item">
    <div :data-linktype="item.type" class="w-job p text-accent data-[linktype=EVENT]:bg-success data-[linktype=EVENT]:text-dark bg-primary rounded">
      <h1 class="text-4xl">{{item.name}}</h1>
      <hr class="h-px my-3 border-2" :class="item.type === 'EVENT' ? 'border-black': 'border-white'" >
      <div class="flex items-center justify-between">
        <h3 class="text-1xl">Type: {{item.type}}</h3>
        <div class="flex gap items-center">
          <h3 class="text-1xl">Cost:</h3>
          <div class="flex flex-row gap-2 fill-accent bg-dark p-2 px-4 rounded w-fit text-accent">
            <token_rounded class="w-6"></token_rounded> {{ item.cost }}
          </div>
        </div>
      </div>
      <p class="" >{{item.description}}</p>
      <div class="mt-3" v-if="item.exposesArguments.length > 0">
        <h3 class="text-2xl">Exposes Arguments</h3>
        <exposed-argument-string :arguments="item.exposesArguments" />
        <!-- <div class="bg-yellow-700 m-2 rounded" v-for="exposedArgument in item.exposesArguments">
          {{exposedArgument}}
        </div> -->
      </div>
      <div class="mt-3" v-if="item.requiredPermissions.length > 0">
        <h3 class="text-2xl flex">Required Permissions</h3>
        <paramsTable
          :header="['name', 'description']"
          :data="item.requiredPermissions.map(parsePermission)" />
      </div>
      <div class="mt-3" v-if="item.acceptParams.length > 0">
        <h3 class="text-2xl">Accept Params</h3>
        <paramsTable :header="['name', 'type', 'description']" :data="item.acceptParams.map(parseAcceptedParams)" />
      </div>
    </div>
  </div>
</template>

<script>
import ExposedArgumentString from "@/components/chainLinkElement/exposedArgumentString.vue";
import Token_rounded from "@/assets/token_rounded.vue";
import {getPermissionFromDecimal} from "@/utils/discordPermissions";
import paramsTable from "@/components/job/paramsTable.vue";

export default {
  name: "jobDescription",
  props: {
    item: Object
  },
  components: {
    ExposedArgumentString,
    Token_rounded,
    paramsTable,
  },
  methods: {
    parsePermission(permissions) {
      const {name, description} = getPermissionFromDecimal(permissions)
      return {name, description}
    },
    parseAcceptedParams(param) {
      const {name, type, description} = param
      return {name, type, description}
    },
  }
}
</script>