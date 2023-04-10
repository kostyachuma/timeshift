import { Capacitor } from '@capacitor/core';

export const useApp = defineStore('app', {
  state: () => ({
    isIOS: false,
    isAndroid: false,
    isWeb: false,
  }),

  getters: {
    // double: (state) => state.n * 2,
  },

  actions: {
    fetchPlatform() {
      const platform = Capacitor.getPlatform();

      this.isIOS = platform === 'ios';
      this.isAndroid = platform === 'android';
      this.isWeb = platform === 'web';
    }

    // increment(amount = 1) {
    //   this.incrementedTimes++
    //   this.n += amount
    // },

    // changeMe() {
    //   console.log('change me to test HMR')
    // },

    // async fail() {
    //   const n = this.n
    //   await delay(1000)
    //   this.numbers.push(n)
    //   await delay(1000)
    //   if (this.n !== n) {
    //     throw new Error('Someone changed n!')
    //   }

    //   return n
    // },

    // async decrementToZero(interval: number = 300) {
    //   if (this.n <= 0) return

    //   while (this.n > 0) {
    //     this.$patch((state) => {
    //       state.n--
    //       state.decrementedTimes++
    //     })
    //     await delay(interval)
    //   }
    // },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApp, import.meta.hot))
}
