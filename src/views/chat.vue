<script lang="tsx" setup>
import { defaultMockModelName, modelMappingList, triggerModelTermination } from '@/components/MarkdownPreview/models'
import { type InputInst } from 'naive-ui'
import type { SelectBaseOption } from 'naive-ui/es/select/src/interface'
import { isGithubDeployed } from '@/config'
import { systemTitle } from '@/base'

import { UAParser } from 'ua-parser-js'

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

  const osName = os.name ?? ''
  return osName
    .toLocaleLowerCase()
    .includes?.('macos')
})

const placeholder = computed(() => {
  if (stylizingLoading.value) {
    return '正在生成回答...'
  }
  return '输入任意问题...'
})

watch(
  () => enterCommand.value,
  () => {
    if (!isMacos.value || notUsingInput.value) return

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
    if (isMacos.value || notUsingInput.value) return

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
      <button
        type="button"
        class="prompt-suggestion"
        aria-label={ `使用建议：${ this.text }` }
        onClick={this.handleClick}
      >
        <span class="prompt-suggestion-icon i-lucide:corner-down-right" aria-hidden="true"></span>
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
      </button>
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
    class="chat-page"
  >
    <div class="chat-workspace">
      <header class="chat-toolbar">
        <a
          class="chat-brand"
          href="https://github.com/pdsuwwz/chatgpt-vue3-light-mvp"
          target="_blank"
          rel="noreferrer"
          :aria-label="`${systemTitle}，打开项目仓库`"
        >
          <span
            class="chat-brand-icon i-lucide:message-square-text"
            aria-hidden="true"
          ></span>
          <span class="chat-brand-title">{{ systemTitle }}</span>
        </a>

        <div class="chat-toolbar-actions">
          <span class="chat-model-label">当前模型</span>
          <n-select
            v-model:value="businessStore.systemModelName"
            class="chat-model-select"
            placeholder="请选择模型"
            :disabled="stylizingLoading"
            :options="modelListSelections"
          />
          <CustomTooltip :disabled="false">
            <div>注意：</div>
            <div>演示环境仅支持 “模拟数据模型”</div>
            <div>
              如需测试其他模型请克隆<a
                href="https://github.com/pdsuwwz/chatgpt-vue3-light-mvp"
                target="_blank"
                rel="noreferrer"
                class="repo-help-link"
              >本仓库</a>到本地运行
            </div>
            <template #trigger>
              <button
                type="button"
                class="chat-help-button"
                aria-label="查看模型使用说明"
              >
                <span
                  class="i-lucide:circle-help"
                  aria-hidden="true"
                ></span>
              </button>
            </template>
          </CustomTooltip>
        </div>
      </header>

      <main class="chat-response-region">
        <MarkdownPreview
          ref="refReaderMarkdownPreview"
          v-model:reader="outputTextReader"
          content-class="chat-markdown-surface"
          :model="businessStore.currentModelItem?.modelName"
          :transform-stream-fn="businessStore.currentModelItem?.transformStreamValue"
          @failed="onFailedReader"
          @completed="onCompletedReader"
        />
      </main>

      <section
        class="chat-composer-zone"
        aria-label="消息输入"
      >
        <div class="chat-composer-inner">
          <div
            class="prompt-suggestions"
            aria-label="建议问题"
          >
            <PromptTag
              v-for="(textItem, idx) in promptTextList"
              :key="idx"
              :text="textItem"
            />
          </div>

          <div class="chat-composer-editor">
            <n-input
              ref="refInputTextString"
              v-model:value="inputTextString"
              type="textarea"
              autofocus
              class="chat-textarea textarea-resize-none"
              :placeholder="placeholder"
              :style="{
                '--n-border-radius': '8px',
                '--n-padding-left': '16px',
                '--n-padding-right': '64px',
                '--n-padding-vertical': '9px',
                '--n-color': 'transparent',
                '--n-color-focus': 'transparent',
                '--n-border': 'none',
                '--n-border-hover': 'none',
                '--n-border-focus': 'none',
                '--n-box-shadow-focus': 'none',
                '--n-placeholder-color': '#8a8b86',
                '--n-text-color': '#20201e',
              }"
            />
            <n-tooltip>
              <template #trigger>
                <n-button
                  class="chat-submit-button"
                  :class="{
                    'is-stopping': stylizingLoading
                  }"
                  :aria-label="stylizingLoading ? '停止生成' : '发送消息'"
                  @click.stop="handleCreateStylized()"
                >
                  <span
                    v-if="stylizingLoading"
                    class="i-lucide:square"
                    aria-hidden="true"
                  ></span>
                  <span
                    v-else
                    class="i-lucide:arrow-up"
                    aria-hidden="true"
                  ></span>
                </n-button>
              </template>
              {{ stylizingLoading ? '停止生成' : '发送消息' }}
            </n-tooltip>
          </div>
        </div>
      </section>
    </div>
  </LayoutCenterPanel>
</template>

<style lang="scss" scoped>
.chat-page {
  --center-panel-background: #f7f7f5;
  --center-panel-shadow: none;
  --footer-background: #f7f7f5;
  --footer-border-color: #e6e6e1;
  --footer-padding: 8px 0;
  --footer-font-size: 12px;
  --footer-text-color: #858680;
}

.chat-workspace {
  --chat-background: #f7f7f5;
  --chat-surface: #fff;
  --chat-text: #20201e;
  --chat-muted: #6f706b;
  --chat-border: #deded9;
  --chat-border-strong: #c9cac3;
  --chat-accent: #596b47;
  --chat-accent-hover: #4d5e3d;

  display: grid;
  grid-template-rows: 56px minmax(0, 1fr) auto;
  width: 100%;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  color: var(--chat-text);
  background: var(--chat-background);
}

.chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-width: 0;
  padding: 0 24px;
  border-bottom: 1px solid var(--chat-border);
  background: rgb(255 255 255 / 76%);
}

.chat-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  color: var(--chat-text);
  transition: color 150ms ease;

  &:hover {
    color: var(--chat-accent);
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 38%);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

.chat-brand-icon {
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
}

.chat-brand-title {
  overflow: hidden;
  font-size: 15px;
  font-weight: 650;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-toolbar-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
}

.chat-model-label {
  margin-right: 2px;
  color: var(--chat-muted);
  font-size: 13px;
}

.chat-model-select {
  width: 252px;

  :deep(.n-base-selection) {
    --n-border-radius: 7px !important;
    --n-border: 1px solid var(--chat-border) !important;
    --n-border-hover: 1px solid var(--chat-border-strong) !important;
    --n-border-active: 1px solid var(--chat-accent) !important;
    --n-box-shadow-active: 0 0 0 2px rgb(89 107 71 / 12%) !important;
    --n-box-shadow-focus: 0 0 0 2px rgb(89 107 71 / 12%) !important;
    --n-color: var(--chat-surface) !important;
    --n-text-color: var(--chat-text) !important;

    min-height: 36px;
    font-size: 13px;
  }
}

.chat-help-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  color: var(--chat-muted);
  font-size: 18px;
  cursor: help;
  background: transparent;
  transition: color 150ms ease, background-color 150ms ease;

  &:hover {
    color: var(--chat-text);
    background: #eeeeea;
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 38%);
    outline-offset: 1px;
  }
}

.repo-help-link {
  padding: 0 2px;
  color: #d5e7c2;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #b9d29f;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
  transition: color 150ms ease, text-decoration-color 150ms ease;

  &:hover,
  &:focus-visible {
    color: #fff;
    text-decoration-color: #fff;
  }
}

.chat-response-region {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.chat-composer-zone {
  min-width: 0;
  padding: 8px 24px calc(10px + env(safe-area-inset-bottom));
  border-top: 1px solid #e8e8e3;
  background: var(--chat-background);
}

.chat-composer-inner {
  width: min(100%, 860px);
  margin: 0 auto;
}

.prompt-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;
  margin-bottom: 6px;
}

:deep(.prompt-suggestion) {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: 320px;
  height: 32px;
  padding: 0 10px;
  overflow: hidden;
  border: 1px solid var(--chat-border);
  border-radius: 6px;
  color: #555650;
  font: inherit;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: transparent;
  transition: color 150ms ease, border-color 150ms ease, background-color 150ms ease;

  &:hover {
    border-color: var(--chat-border-strong);
    color: var(--chat-text);
    background: #eeeeea;
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 38%);
    outline-offset: 1px;
  }
}

:deep(.prompt-suggestion-icon) {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  color: #858680;
}

.chat-composer-editor {
  position: relative;
  min-height: 64px;
  overflow: hidden;
  border: 1px solid #d6d6d1;
  border-radius: 10px;
  background: var(--chat-surface);
  box-shadow: 0 1px 2px rgb(32 32 30 / 5%);
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:focus-within {
    border-color: var(--chat-accent);
    box-shadow: 0 0 0 2px rgb(89 107 71 / 12%);
  }
}

.chat-textarea {
  width: 100%;
  height: 64px;
  font-size: 15px;
  line-height: 1.55;

  :deep(.n-input-wrapper),
  :deep(.n-input__textarea) {
    height: 100%;
  }
}

.chat-submit-button {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  background: var(--chat-accent);
  transition: background-color 150ms ease, opacity 150ms ease;

  &:hover,
  &:focus {
    color: #fff;
    background: var(--chat-accent-hover);
  }

  &:focus-visible {
    outline: 2px solid rgb(89 107 71 / 42%);
    outline-offset: 2px;
  }

  &:active {
    background: #435136;
  }

  &.is-stopping {
    background: #33342f;

    &:hover,
    &:focus {
      background: #20211e;
    }
  }

  :deep(.n-button__content) {
    width: 18px;
    height: 18px;
  }
}

:deep(.chat-markdown-surface) {
  background: transparent;
}

:deep(.chat-markdown-surface .markdown-content-scroller) {
  padding: 36px 24px 48px;
  scrollbar-color: #c9cac3 transparent;
  scrollbar-width: thin;
}

:deep(.chat-markdown-surface .markdown-wrapper) {
  width: min(100%, 820px);
  margin: 0 auto;
  color: #2b2c28;
  font-size: 15px;
  line-height: 1.72;
}

:deep(.chat-markdown-surface .markdown-stream-status) {
  display: flex;
  align-items: center;
  width: min(100%, 820px);
  min-height: 32px;
  margin: 8px auto 0;
  color: var(--chat-accent);
}

:deep(.chat-markdown-surface .markdown-wrapper h1),
:deep(.chat-markdown-surface .markdown-wrapper h2),
:deep(.chat-markdown-surface .markdown-wrapper h3),
:deep(.chat-markdown-surface .markdown-wrapper h4),
:deep(.chat-markdown-surface .markdown-wrapper h5),
:deep(.chat-markdown-surface .markdown-wrapper h6) {
  margin: 1.6em 0 0.65em;
  color: #20201e;
  font-weight: 650;
  line-height: 1.3;
}

:deep(.chat-markdown-surface .markdown-wrapper h1) {
  font-size: 24px;
}

:deep(.chat-markdown-surface .markdown-wrapper h2) {
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e3de;
  font-size: 20px;
}

:deep(.chat-markdown-surface .markdown-wrapper h3) {
  font-size: 17px;
}

:deep(.chat-markdown-surface .markdown-wrapper p) {
  margin: 0.8em 0;
  line-height: 1.72;
}

:deep(.chat-markdown-surface .markdown-wrapper ul),
:deep(.chat-markdown-surface .markdown-wrapper ol) {
  padding-left: 1.5em;
  line-height: 1.65;
}

:deep(.chat-markdown-surface .markdown-wrapper a) {
  padding: 0;
  color: #4f623e;
  font-weight: 600;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

:deep(.chat-markdown-surface .markdown-wrapper blockquote) {
  margin: 18px 0;
  padding: 2px 0 2px 16px;
  border-left: 3px solid #aeb7a5;
  color: #5e605a;
  background: transparent;
}

:deep(.chat-markdown-surface .markdown-wrapper p > code),
:deep(.chat-markdown-surface .markdown-wrapper li > code) {
  padding: 2px 5px;
  border: 1px solid #dfdfda;
  border-radius: 4px;
  color: #353630;
  background: #efefeb;
}

:deep(.chat-markdown-surface .markdown-code-wrapper) {
  margin: 16px 0;
  border: 1px solid #ddddda;
  border-radius: 8px;
  background: #f1f1ee;
}

:deep(.chat-markdown-surface .markdown-code-header) {
  min-height: 38px;
  border-color: #ddddda;
}

:deep(.chat-markdown-surface .markdown-code-lang) {
  color: #6f706b;
  font-size: 12px;
}

:deep(.chat-markdown-surface .markdown-code-copy) {
  min-width: 40px;
  min-height: 38px;
  color: #666761;
  transition: color 150ms ease, background-color 150ms ease;

  &:hover {
    color: #20201e;
    background: #e7e7e2;
  }
}

:deep(.chat-markdown-surface .markdown-wrapper table) {
  width: max-content;
  max-width: 100%;
  border: 1px solid #ddddda;
  border-radius: 6px;
}

:deep(.chat-markdown-surface .markdown-wrapper th),
:deep(.chat-markdown-surface .markdown-wrapper td) {
  padding: 8px 10px;
  border-color: #ddddda;
}

:deep(.chat-markdown-surface .markdown-wrapper th) {
  background: #efefeb;
}

:deep(.chat-markdown-surface .markdown-wrapper tr:nth-child(even)),
:deep(.chat-markdown-surface .markdown-wrapper tr:hover) {
  background: transparent;
}

:deep(.chat-markdown-surface .markdown-empty-state),
:deep(.chat-markdown-surface .n-empty) {
  color: var(--chat-muted);
  font-weight: 500;
}

:deep(.chat-markdown-surface .n-empty__icon) {
  color: #7a8870;
}

:deep(.chat-markdown-surface .markdown-copy-action) {
  top: 20px !important;
  right: max(24px, calc((100% - 820px) / 2)) !important;
  width: 40px;
  height: 40px;
  border: 1px solid var(--chat-border);
  color: var(--chat-muted);
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 1px 3px rgb(32 32 30 / 6%);
}

@media (width <= 640px) {

  .chat-workspace {
    grid-template-rows: 52px minmax(0, 1fr) auto;
  }

  .chat-toolbar {
    gap: 8px;
    padding: 0 12px;
  }

  .chat-brand-title,
  .chat-model-label {
    display: none;
  }

  .chat-model-select {
    width: min(47vw, 180px);
  }

  .chat-help-button {
    width: 40px;
    height: 40px;
  }

  .chat-composer-zone {
    padding: 7px 12px calc(8px + env(safe-area-inset-bottom));
  }

  .prompt-suggestions {
    flex-wrap: nowrap;
    margin-right: -12px;
    padding-right: 12px;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  :deep(.prompt-suggestion) {
    flex: 0 0 auto;
    max-width: min(78vw, 280px);
  }

  .chat-composer-editor {
    min-height: 60px;
  }

  .chat-textarea {
    height: 60px;
  }

  .chat-submit-button {
    bottom: 10px;
  }

  :deep(.chat-markdown-surface .markdown-content-scroller) {
    padding: 24px 16px 36px;
  }

  :deep(.chat-markdown-surface .markdown-wrapper) {
    font-size: 14px;
    line-height: 1.68;
  }

  :deep(.chat-markdown-surface .markdown-copy-action) {
    top: 12px !important;
    right: 12px !important;
  }
}

</style>
