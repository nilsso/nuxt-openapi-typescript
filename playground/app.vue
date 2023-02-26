<script lang="ts" setup>
import { useAsyncData, useOpenAPI } from '#imports'
const createApiFetch = useOpenAPI()
const fetchStoreInventory = createApiFetch('/store/inventory', 'get')
const { data } = await useAsyncData(() => fetchStoreInventory({}))
</script>
<template>
  <div>
    <div>
      {{ data }}
    </div>
  </div>
</template>
