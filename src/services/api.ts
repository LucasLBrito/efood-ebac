import type { Restaurante } from '../types'

const BASE_URL = 'https://api-ebac.vercel.app/api/efood'

export const getRestaurantes = async (): Promise<Restaurante[]> => {
  const response = await fetch(`${BASE_URL}/restaurantes`)
  return response.json()
}

export const getRestaurante = async (id: number): Promise<Restaurante> => {
  const response = await fetch(`${BASE_URL}/restaurantes/${id}`)
  return response.json()
}
