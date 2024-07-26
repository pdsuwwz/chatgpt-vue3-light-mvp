<script lang="ts" setup>
import NaiveProvider from './NaiveProvider.vue'
import { dateZhCN, zhCN } from 'naive-ui'

const { defaultTheme, themeOverrides } = useTheme()

defineOptions({
  name: 'App'
})
useCopyCode()
</script>

<template>
  <NConfigProvider
    class="h-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="defaultTheme"
    :theme-overrides="themeOverrides"
  >
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </NConfigProvider>
</template>

<style lang="scss">
@use "@/styles/index.scss";
</style>
