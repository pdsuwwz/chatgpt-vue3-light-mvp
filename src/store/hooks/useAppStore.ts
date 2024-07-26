import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore('app-store', () => {
  return {
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
