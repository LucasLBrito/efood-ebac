import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Prato } from '../types'

export interface CartItem extends Prato {
  quantidade: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Prato>) {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        existing.quantidade += 1
      } else {
        state.items.push({ ...action.payload, quantidade: 1 })
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
    openCart(state) {
      state.isOpen = true
    },
    closeCart(state) {
      state.isOpen = false
    },
  },
})

export const { addItem, removeItem, clearCart, openCart, closeCart } =
  cartSlice.actions
export default cartSlice.reducer
