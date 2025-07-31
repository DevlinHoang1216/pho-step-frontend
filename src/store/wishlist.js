import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: []
  }),
  actions: {
    addToWishlist(product) {
      if (!this.wishlist.some(p => p.id === product.id)) {
        this.wishlist.push({ ...product })
      }
    }
  }
})