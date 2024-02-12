import { Capacitor } from '@capacitor/core';

export const useApp = defineStore('app', {
  state: () => ({
    isIOS: false,
    isAndroid: false,
    isWeb: false,
  }),

  actions: {
    fetchPlatform() {
      const platform = Capacitor.getPlatform();

      this.isIOS = platform === 'ios';
      this.isAndroid = platform === 'android';
      this.isWeb = platform === 'web';
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApp, import.meta.hot))
}
