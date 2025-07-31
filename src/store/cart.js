import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    addToCart(product) {
      const index = this.cart.findIndex(p => p.id === product.id)
      if (index >= 0) this.cart[index].quantity++
      else this.cart.push({ ...product, quantity: 1 })
    },
    removeItem(index) {
      this.cart.splice(index, 1)
    }
  }
})