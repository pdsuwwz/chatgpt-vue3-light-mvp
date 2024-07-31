<script lang="ts" setup>
import { isMockDevelopment } from '@/config'
import MarkdownInstance from './plugins/markdown'
import { type TransformStreamModelTypes, transformStreamValue } from './transform'

interface Props {
  reader: ReadableStreamDefaultReader<Uint8Array> | null
  model?: TransformStreamModelTypes
}

const props = withDefaults(
  defineProps<Props>(),
  {
    reader: null,
    model: 'standard'
  }
)


// 定义响应式变量
const displayText = ref('')
const textBuffer = ref('')
const readerLoading = ref(false)

const isAbort = ref(false)

const isCompleted = ref(false)

const emit = defineEmits([
  'failed',
  'completed',
  'update:reader'
])


const refWrapperContent = ref<HTMLElement>()

let typingAnimationFrame: number | null = null

const renderedMarkdown = computed(() => {
  return MarkdownInstance.render(displayText.value)
})


const abortReader = () => {
  if (props.reader) {
    props.reader.cancel()
  }

  isAbort.value = true
  readIsOver.value = false
  emit('update:reader', null)
  initializeEnd()
  isCompleted.value = true
}

const resetStatus = () => {
  isAbort.value = false
  isCompleted.value = false
  readIsOver.value = false

  emit('update:reader', null)

  initializeEnd()
  displayText.value = ''
  textBuffer.value = ''
  readerLoading.value = false
  if (typingAnimationFrame) {
    cancelAnimationFrame(typingAnimationFrame)
    typingAnimationFrame = null
  }
}

/**
 * 检查是否有实际内容
 */
function hasActualContent(html) {
  const text = html.replace(/<[^>]*>/g, '')
  return /\S/.test(text)
}

const showCopy = computed(() => {
  if (!isCompleted.value) return false

  if (hasActualContent(displayText.value)) {
    return true
  }
  return false
})

const renderedContent = computed(() => {
  // 在 renderedMarkdown 末尾插入光标标记
  return `${ renderedMarkdown.value }`
})


const initialized = ref(false)

const initializeStart = () => {
  initialized.value = true
}

const initializeEnd = () => {
  initialized.value = false
}

/**
 * reader 读取是否结束
 */
const readIsOver = ref(false)
const readTextStream = async () => {
  if (!props.reader) return


  const textDecoder = new TextDecoder('utf-8')
  readerLoading.value = true

  while (true) {
    if (isAbort.value) {
      break
    }
    try {
      if (!props.reader) {
        readIsOver.value = true
        break
      }
      const { value, done } = await props.reader.read()
      if (!props.reader) {
        readIsOver.value = true
        break
      }
      if (done) {
        readIsOver.value = true
        break
      }

      const transformer = transformStreamValue[props.model]
      if (!transformer) {
        break
      }

      const stream = transformer.call(transformStreamValue, value, textDecoder)
      if (stream.done) {
        readIsOver.value = true
        break
      }
      textBuffer.value += stream.content

      if (typingAnimationFrame === null) {
        showText()
      }
    } catch (error) {
      readIsOver.value = true
      emit('failed', error)
      resetStatus()
      break
    } finally {
      initializeEnd()
    }
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (!refWrapperContent.value) return

  refWrapperContent.value.scrollTop = refWrapperContent.value.scrollHeight
}
const scrollToBottomByThreshold = async () => {
  if (!refWrapperContent.value) return

  const threshold = 100
  const distanceToBottom = refWrapperContent.value.scrollHeight - refWrapperContent.value.scrollTop - refWrapperContent.value.clientHeight
  if (distanceToBottom <= threshold) {
    scrollToBottom()
  }
}

const scrollToBottomIfAtBottom = async () => {
  // TODO: 需要同时支持手动向上滚动
  scrollToBottomByThreshold()
}

/**
 * 读取 buffer 内容，逐字追加到 displayText
 */
const runReadBuffer = (readCallback = () => {}, endCallback = () => {}) => {
  if (textBuffer.value.length > 0) {
    const nextChunk = textBuffer.value.substring(0, 10)
    displayText.value += nextChunk
    textBuffer.value = textBuffer.value.substring(10)
    readCallback()
  } else {
    endCallback()
  }
}

const showText = () => {
  if (isAbort.value && typingAnimationFrame) {
    cancelAnimationFrame(typingAnimationFrame)
    typingAnimationFrame = null
    readerLoading.value = false
    return
  }

  // 若 reader 还没结束，则保持打字行为
  if (!readIsOver.value) {
    runReadBuffer()
    typingAnimationFrame = requestAnimationFrame(showText)
  } else {
    // 读取剩余的 buffer
    runReadBuffer(
      () => {
        typingAnimationFrame = requestAnimationFrame(showText)
      },
      () => {
        window.$ModalNotification.success({
          title: '生成完毕',
          duration: 1500
        })
        emit('update:reader', null)
        emit('completed')
        readerLoading.value = false
        isCompleted.value = true
        nextTick(() => {
          readIsOver.value = false
        })
        typingAnimationFrame = null
      }
    )
  }
  scrollToBottomIfAtBottom()
}

watch(
  () => props.reader,
  () => {
    if (props.reader) {
      readTextStream()
    }
  },
  {
    immediate: true,
    deep: true
  }
)


onUnmounted(() => {
  resetStatus()
})

defineExpose({
  abortReader,
  resetStatus,
  initializeStart,
  initializeEnd
})

const showLoading = computed(() => {
  if (initialized.value) {
    return true
  }

  if (!props.reader) {
    return false
  }

  if (!readerLoading) {
    return false
  }
  if (displayText.value) {
    return false
  }

  return false
})

const refClipBoard = ref()
const handlePassClip = () => {
  if (refClipBoard.value) {
    refClipBoard.value.copyText()
  }
}

const emptyPlaceholder = isMockDevelopment
  ? '当前为模拟环境\n随便问一个问题，我才会消失 ~'
  : '问一个问题，我才会消失 ~'
</script>

<template>
  <n-spin
    relative
    flex="1 ~"
    min-h-0
    w-full
    h-full
    content-class="w-full h-full flex"
    :show="showLoading"
    :rotate="false"
    class="bg-#fff:30"
    :style="{
      '--n-opacity-spinning': '0.3'
    }"
  >
    <transition name="fade">
      <n-float-button
        v-if="showCopy"
        position="absolute"
        :top="30"
        :right="30"
        color
        class="c-warning bg-#fff/80 hover:bg-#fff/90 transition-all-200 z-2"
        @click="handlePassClip()"
      >
        <clip-board
          ref="refClipBoard"
          :auto-color="false"
          no-copy
          :text="displayText"
        />
      </n-float-button>
    </transition>
    <template #icon>
      <div class="i-svg-spinners:3-dots-rotate"></div>
    </template>
    <!-- b="~ solid #ddd" -->
    <div
      flex="1 ~"
      min-w-0
      min-h-0
      :class="[
        reader
          ? ''
          : 'justify-center items-center'
      ]"
    >
      <div
        text-16
        class="w-full h-full overflow-hidden"
        :class="[
          !displayText && 'flex items-center justify-center'
        ]"
      >
        <n-empty
          v-if="!displayText"
          size="large"
          class="font-bold"
        >
          <div
            whitespace-break-spaces
            text-center
            v-html="emptyPlaceholder"
          ></div>
          <template #icon>
            <n-icon>
              <div class="i-hugeicons:ai-chat-02"></div>
            </n-icon>
          </template>
        </n-empty>
        <div
          v-else
          ref="refWrapperContent"
          text-16
          class="w-full h-full overflow-y-auto"
          p-24px
        >
          <div
            class="markdown-wrapper"
            v-html="renderedContent"
          ></div>
          <div
            v-if="readerLoading"
            size-24
            class="i-svg-spinners:pulse-3"
          ></div>
        </div>
      </div>
    </div>
  </n-spin>
</template>

<style lang="scss">
.markdown-wrapper {

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.25em;
  }

  h4 {
    font-size: 1em;
  }

  h5 {
    font-size: 0.875em;
  }

  h6 {
    font-size: 0.85em;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0 auto;
    line-height: 1.25;
  }

  & ul,ol {
    padding-left: 1.5em;
    line-height: 0.8;
  }

  & ul,li,ol {
    list-style-position: outside;
    white-space: normal;
  }

  li {
    line-height: 1.5;
  }

  ol ol {
    padding-left: 20px;
  }

  ul ul {
    padding-left: 20px;
  }

  hr {
    margin: 16px 0;
  }

  a {
    color: $color-default;
    font-weight: bolder;
    text-decoration: underline;
    padding: 0 3px;
  }

  p {
    line-height: 1.4;

    & > code {
      --at-apply: 'bg-#e5e5e5';
      --at-apply: whitespace-pre mx-4px px-6px py-3px rounded-5px;
    }


    img {
      display: inline-block;
    }
  }

  li > p {
    line-height: 2
  }

  blockquote {
    padding: 10px;
    margin: 20px 0;
    border-left: 5px solid #ccc;
    background-color: #f9f9f9;
    color: #555;

    & > p {
      margin: 0;
    }
  }
}
</style>
