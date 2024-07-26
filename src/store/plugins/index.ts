/**
 * Plugins for Pinia
 */

import { getFilterResponse } from '@/store/utils/mixin'
import router from '@/router'

export const pluginPinia = ({ store }) => {
  store.filterResponse = getFilterResponse
  store.router = router
}
