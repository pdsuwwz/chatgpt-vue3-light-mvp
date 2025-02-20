<script lang="tsx" setup>
</script>

<template>
  <n-tooltip
    trigger="hover"
    content-class="wrapper-tooltip-scroller"
    v-bind="$attrs"
  >
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <slot></slot>
  </n-tooltip>
</template>
