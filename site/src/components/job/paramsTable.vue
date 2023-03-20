<template>
  <table class="rounded overflow-hidden w-full text-accent">
    <thead class="uppercase bg-dark text-gray-400">
      <th class="px-6 py-3" v-for="colHeader in header">{{colHeader}}</th>
    </thead>
    <tbody>
      <tr class="border-b border-gray-600 bg-tertiary " v-for="rowData in data">
        <td class="px-3 py-2" v-for="key in Object.keys(rowData)">{{rowData[key]}}</td>
        <!-- <td class="px-3 py-2" v-for="key in header">{{rowData[key]}}</td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "paramsTable",
  props: {
    header: Array,
    data: Array
  }
}
</script>