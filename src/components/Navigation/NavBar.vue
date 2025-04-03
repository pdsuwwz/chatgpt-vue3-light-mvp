<script lang="tsx" setup>
import { systemTitle } from '@/base'

interface Props {
  transparent?: boolean
  hasBorder?: boolean
}
withDefaults(
  defineProps<Props>(),
  {
    transparent: true,
    hasBorder: true
  }
)


const handleToRepo = () => {
  const link = ref('https://github.com/pdsuwwz/chatgpt-vue3-light-mvp')
  window.open(link.value, '_blank')
}


</script>

<template>
  <header
    class="navigation-nav-header-container b-b"
    :class="[
      transparent
        ? 'bg-bgcolor'
        : 'bg-transparent',
      hasBorder
        ? 'b-b-#000/8 b-b-solid'
        : 'b-b-transparent'
    ]"
  >
    <div
      class="header-left"
    >
      <div
        flex="~ items-center justify-center"
        class="text-20"
        select-none
        cursor-pointer
        @click="handleToRepo()"
      >
        <div class="size-24 i-streamline-emojis:cloud-1"></div>
        <div class="flex-1 pl-10 font-600 text-center">{{ systemTitle }}</div>
      </div>
    </div>
    <div class="flex-1">
      <div
        flex="~ col items-center justify-center"
        px-36px
      >
        <slot name="bottom"></slot>
      </div>
    </div>

    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.navigation-nav-header-container {
  --at-apply: w-full flex items-center justify-center;
  --at-apply: px-16 py-10;
  --at-apply: lt-lg:flex-col;

  .header-left,
  .header-right {
    --at-apply: flex items-center h-full text-16;
  }

  .header-left {
    --at-apply: h-50px;
  }

  .header-right {
    --at-apply: flex items-center h-full text-16;
  }
}
</style>
