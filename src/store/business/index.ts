import { defineStore } from 'pinia'

import * as FilesTool from '@/utils/files-tool'

import { sleep } from '@/utils/request'
import * as GlobalAPI from '@/api'
import * as GlobalMockData from '@/data'


import * as TransformUtils from '@/components/MarkdownPreview/transform'
import { isMockDevelopment } from '@/config'

export interface BusinessState {
  writerList: Array<any>
}

export const useBusinessStore = defineStore('business-store', {
  state: (): BusinessState => {
    return {
      writerList: []
    }
  },
  actions: {
    /**
     * Event Stream 调用大模型接口
     */
    async createAssistantWriterStylized(writerOid, data): Promise<{error: number
      reader: ReadableStreamDefaultReader<string> | null}> {
      // TODO: 若部署了 Github Pages 则调用静态模拟数据
      if (isMockDevelopment) {
        await sleep(500)
        return {
          error: 0,
          reader: FilesTool.createMockReader()
        }
      }

      // TODO: 本地运行调用接口
      return new Promise((resolve) => {
        GlobalAPI.createKimiMoonshotStylized(data.text)
          .then((res) => {
            if (res.body) {
              const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(TransformUtils.splitStream('\n'))
                .getReader()

              resolve({
                error: 0,
                reader
              })
            } else {
              resolve({
                error: 1,
                reader: null
              })
            }
          })
          .catch((err) => {
            resolve({
              error: 1,
              reader: null
            })
          })
      })
    }
  }
})
