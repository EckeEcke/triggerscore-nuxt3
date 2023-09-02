import { defineStore } from 'pinia'

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => {
    return {
        locale: "de",
        localeSetByUser: false
    }
  },
  persist: {
    // storage: persistedState.localStorage,
  },
})