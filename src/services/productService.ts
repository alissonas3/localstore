import { apiFetch } from './apiClient'
import type { IProduct } from '@/types/product'

export function getProducts(): Promise<IProduct[]> {
  return apiFetch<IProduct[]>('/products')
}

export function getProductById(id: number): Promise<IProduct> {
  return apiFetch<IProduct>(`/products/${id}`)
}
