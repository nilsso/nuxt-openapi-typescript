<script lang="ts" setup>
import { ref, useAsyncData, useOpenAPI } from '#imports'
const createApiFetch = useOpenAPI()

const fetchStoreInventory = createApiFetch('/store/inventory', 'get')

// const id = ref(1)
const { data } = await useAsyncData(() => fetchStoreInventory({}))
</script>
<template>
  <div>
    <!-- <div> -->
    <!--   <input v-model="id" type="number" @change="refresh()"> -->
    <!-- </div> -->
    <div>
      {{ data }}
    </div>
  </div>
</template>
