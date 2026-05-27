import type { Restaurante } from '../types'
import { restaurants } from '../data/restaurants'

export const getRestaurantes = async (): Promise<Restaurante[]> => {
  return restaurants
}

export const getRestaurante = async (id: number): Promise<Restaurante> => {
  const found = restaurants.find((r) => r.id === id)
  if (!found) throw new Error(`Restaurante ${id} não encontrado`)
  return found
}
