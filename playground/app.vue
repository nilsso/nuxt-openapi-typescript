<script lang="ts" setup>
import { useAsyncData, useOpenAPI } from '#imports'
import { paths } from '#build/api'
const createApiFetch = useOpenAPI<paths>()

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
