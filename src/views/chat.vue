<script lang="tsx" setup>
import { LLMTypes, type TransformStreamModelTypes } from '@/components/MarkdownPreview/transform'
import { isMockDevelopment } from '@/config'
import { type InputInst } from 'naive-ui'

import { UAParser } from 'ua-parser-js'

const route = useRoute()
const router = useRouter()
const businessStore = useBusinessStore()

/**
 * 默认大模型
 */
const defaultLLMTypeName: TransformStreamModelTypes = isMockDevelopment
  ? 'standard'
  : 'moonshot'

const currentLLMType = computed(() => {
  return LLMTypes.find(v => v.modelName === defaultLLMTypeName)
})

const currentChatId = computed(() => {
  return route.params.chatId
})

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 700)


const stylizingLoading = ref(false)


/**
 * 输入字符串
 */
const inputTextString = ref('')
const refInputTextString = ref<InputInst | null>()

/**
 * 输出字符串 Reader 流（风格化的）
 */
const outputTextReader = ref<ReadableStreamDefaultReader | null>()

const refReaderMarkdownPreview = ref<any>()

const onFailedReader = () => {
  outputTextReader.value = null
  stylizingLoading.value = false
  if (refReaderMarkdownPreview.value) {
    refReaderMarkdownPreview.value.initializeEnd()
  }
  window.$ModalMessage.error('转换失败，请重试')
  setTimeout(() => {
    if (refInputTextString.value) {
      refInputTextString.value.focus()
    }
  })
}
const onCompletedReader = () => {
  stylizingLoading.value = false
  setTimeout(() => {
    if (refInputTextString.value) {
      refInputTextString.value.focus()
    }
  })
}

const handleCreateStylized = async () => {
  // 若正在加载，则点击后恢复初始状态
  if (stylizingLoading.value) {
    refReaderMarkdownPreview.value.abortReader()
    onCompletedReader()
    return
  }


  if (refInputTextString.value && !inputTextString.value.trim()) {
    inputTextString.value = ''
    refInputTextString.value.focus()
    return
  }

  refReaderMarkdownPreview.value.resetStatus()
  refReaderMarkdownPreview.value.initializeStart()

  stylizingLoading.value = true
  const textContent = inputTextString.value
  inputTextString.value = ''
  const { error, reader } = await businessStore.createAssistantWriterStylized(currentChatId.value, {
    text: textContent,
    writer_oid: currentChatId.value
  })

  if (error) {
    onFailedReader()
    return
  }

  if (reader) {
    outputTextReader.value = reader
  }
}


const keys = useMagicKeys()
const enterCommand = keys['Meta+Enter']
const enterCtrl = keys['Ctrl+Enter']

const activeElement = useActiveElement()
const notUsingInput = computed(() => activeElement.value?.tagName !== 'TEXTAREA')

const parser = new UAParser()
const isMacos = computed(() => {
  const os = parser.getOS()
  if (!os) return

  return os.name?.includes?.('macos')
})

const placeholder = computed(() => {
  if (stylizingLoading.value) {
    return `输入任意问题...`
  }
  return `输入任意问题, 按 ${ isMacos ? 'Command' : 'Ctrl' } + Enter 键快捷开始...`
})

watch(
  () => enterCommand.value,
  () => {
    if (!isMacos || notUsingInput.value) return

    if (stylizingLoading.value) return

    if (!enterCommand.value) {
      handleCreateStylized()
    }
  },
  {
    deep: true
  }
)

watch(
  () => enterCtrl.value,
  () => {
    if (isMacos || notUsingInput.value) return

    if (stylizingLoading.value) return

    if (!enterCtrl.value) {
      handleCreateStylized()
    }
  },
  {
    deep: true
  }
)


const handleResetState = () => {
  if (isMockDevelopment) {
    inputTextString.value = ''
  } else {
    inputTextString.value = '使用中文，回答以下两个问题，分段表示\n1、你是什么模型？\n2、分别使用 Vue3 setup Composition API 语法糖、React 语法编写一个 Button 组件'
  }

  stylizingLoading.value = false
  nextTick(() => {
    refInputTextString.value?.focus()
  })
  refReaderMarkdownPreview.value?.abortReader()
  refReaderMarkdownPreview.value?.resetStatus()
}
handleResetState()

</script>

<template>
  <LayoutCenterPanel
    :loading="loading"
  >
    <!-- 内容区域 -->
    <div
      flex="~ col"
      h-full
    >
      <div
        flex="~ justify-between items-center"
      >
        <NavigationNavBar>
          <template #bottom>
            <div class="pt-10 text-16">
              <span>当前模型：</span>
              <span class="font-italic font-bold">{{ currentLLMType?.label }}</span>
            </div>
          </template>
        </NavigationNavBar>
      </div>

      <div
        flex="1 ~ col"
        min-h-0
        pb-20
      >
        <MarkdownPreview
          ref="refReaderMarkdownPreview"
          v-model:reader="outputTextReader"
          :model="defaultLLMTypeName"
          @failed="onFailedReader"
          @completed="onCompletedReader"
        />
      </div>

      <div
        flex="~ col items-center"
        flex-basis="10%"
        p="14px"
        py="0"
      >
        <div
          relative
          flex="1"
          w-full
          px-1em
        >
          <n-input
            ref="refInputTextString"
            v-model:value="inputTextString"
            type="textarea"
            autofocus
            h-full
            class="textarea-resize-none text-15"
            :style="{
              '--n-border-radius': '20px',
              '--n-padding-left': '20px',
              '--n-padding-right': '20px',
              '--n-padding-vertical': '10px',
            }"
            :placeholder="placeholder"
          />
          <n-float-button
            position="absolute"
            :right="40"
            bottom="50%"
            :type="stylizingLoading ? 'primary' : 'default'"
            color
            :class="[
              stylizingLoading && 'opacity-90',
              'translate-y-50%'
            ]"
            @click.stop="handleCreateStylized()"
          >
            <div
              v-if="stylizingLoading"
              class="i-svg-spinners:pulse-2 c-#fff"
            ></div>
            <div
              v-else
              class="transform-rotate-z--90 text-22 c-#303133/70 i-hugeicons:start-up-02"
            ></div>
          </n-float-button>
        </div>
      </div>
    </div>
  </LayoutCenterPanel>
</template>

<style lang="scss" scoped>

</style>
