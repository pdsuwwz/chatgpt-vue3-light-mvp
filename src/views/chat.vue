<script lang="tsx" setup>
import { defaultMockModelName, modelMappingList, triggerModelTermination } from '@/components/MarkdownPreview/models'
import { type InputInst } from 'naive-ui'
import type { SelectBaseOption } from 'naive-ui/es/select/src/interface'
import { isGithubDeployed } from '@/config'

import { UAParser } from 'ua-parser-js'

const route = useRoute()
const router = useRouter()
const businessStore = useBusinessStore()


const modelListSelections = computed(() => {
  return modelMappingList.map<SelectBaseOption>((modelItem) => {
    let disabled = false
    if (isGithubDeployed && modelItem.modelName !== defaultMockModelName) {
      disabled = true
    }

    return {
      label: modelItem.label,
      value: modelItem.modelName,
      // Github 演示环境禁用模型切换，拉取代码后可按自己需求修改
      disabled
    }
  })
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
  triggerModelTermination()
}
const onCompletedReader = () => {
  stylizingLoading.value = false
  setTimeout(() => {
    if (refInputTextString.value) {
      refInputTextString.value.focus()
    }
  })
  triggerModelTermination()
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
  const { error, reader } = await businessStore.createAssistantWriterStylized({
    text: textContent
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
  inputTextString.value = ''

  stylizingLoading.value = false
  nextTick(() => {
    refInputTextString.value?.focus()
  })
  refReaderMarkdownPreview.value?.abortReader()
  refReaderMarkdownPreview.value?.resetStatus()
}
handleResetState()


const PromptTag = defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const handleClick = () => {
      inputTextString.value = props.text
      nextTick(() => {
        refInputTextString.value?.focus()
      })
    }
    return {
      handleClick
    }
  },
  render() {
    return (
      <div
        b="~ solid transparent"
        hover="shadow-[--shadow] b-primary bg-#e8e8e8"
        class={[
          'px-10 py-2 rounded-7 text-12',
          'max-w-230 transition-all-300 select-none cursor-pointer',
          'c-#525252 bg-#ededed'
        ]}
        style={{
          '--shadow': '3px 3px 3px -1px rgba(0,0,0,0.1)'
        }}
        onClick={this.handleClick}
      >
        <n-ellipsis
          tooltip={{
            contentClass: 'wrapper-tooltip-scroller',
            keepAliveOnHover: true
          }}
        >
          {{
            tooltip: () => this.text,
            default: () => this.text
          }}
        </n-ellipsis>
      </div>
    )
  }
})

const promptTextList = ref([
  '打个招呼吧，并告诉我你的名字',
  '使用中文，回答以下两个问题，分段表示\n1、你是什么模型？\n2、请分别使用 Vue3 和 React 编写一个 Button 组件，要求在 Vue3 中使用 Setup Composition API 语法糖，在 React 中使用 TSX 语法'
])


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
            <div
              flex="~ justify-center items-center wrap"
              class="pt-10 text-16"
            >
              <span>当前模型：</span>
              <div
                flex="~ justify-center items-center"
              >
                <n-select
                  v-model:value="businessStore.systemModelName"
                  class="w-280 pr-10 font-italic font-bold"
                  placeholder="请选择模型"
                  :disabled="stylizingLoading"
                  :options="modelListSelections"
                />
                <CustomTooltip
                  :disabled="false"
                >
                  <div>注意：</div>
                  <div>
                    演示环境仅支持 “模拟数据模型”
                  </div>
                  <div>
                    如需测试其他模型请克隆<a
                      href="https://github.com/pdsuwwz/chatgpt-vue3-light-mvp"
                      target="_blank"
                      class="px-2 underline c-warning font-bold"
                    >本仓库</a>到本地运行
                  </div>
                  <template #trigger>
                    <span class="cursor-help font-bold c-primary text-17 i-radix-icons:question-mark-circled"></span>
                  </template>
                </CustomTooltip>
              </div>
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
          :model="businessStore.currentModelItem?.modelName"
          :transform-stream-fn="businessStore.currentModelItem?.transformStreamValue"
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
          w-full
          flex="~ justify-start"
          class="px-1em pb-10"
        >
          <n-space>
            <PromptTag
              v-for="(textItem, idx) in promptTextList"
              :key="idx"
              :text="textItem"
            />
          </n-space>
        </div>
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
