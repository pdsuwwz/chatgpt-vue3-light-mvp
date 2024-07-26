<script lang="ts" setup>
interface Props {
  loading?: boolean
}
withDefaults(
  defineProps<Props>(),
  {
    loading: false
  }
)
</script>

<template>
  <LayoutSlotFrame
    :class="[
      'bg-no-repeat bg-cover bg-center',
    ]"
  >
    <template #center>
      <div
        w-full
        h-full
        overflow-hidden
        class="panel-shadow"
      >
        <n-spin
          w-full
          h-full
          content-class="w-full h-full flex"
          :show="loading"
          :rotate="false"
          class="bg-#fefbff"
          :style="{
            '--n-opacity-spinning': '0'
          }"
        >
          <template #icon>
            <div class="i-svg-spinners:pulse-3"></div>
          </template>
          <section
            v-if="$slots.left"
            flex="~ col"
            w-300
            h-full
            overflow-hidden
          >
            <slot name="left"></slot>
          </section>
          <section
            flex="1"
            h-full
            overflow-hidden
          >
            <slot name="default"></slot>
          </section>
        </n-spin>
      </div>
    </template>
    <template #bottom>
      <NavigationNavFooter />
    </template>
  </LayoutSlotFrame>
</template>

<style lang="scss" scoped>
.panel-shadow {
  --shadow: 50px 50px 100px 10px rgb(0 0 0 / 10%);
  --at-apply: "shadow-[--shadow]"
}
</style>
