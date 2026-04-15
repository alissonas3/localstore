import { IProduct } from '@/types/product'

export interface ProductInfoItem {
  label: string
  value: string
}

export function buildProductInfoItems(product: IProduct): ProductInfoItem[] {
  return [
    { label: 'Categoria', value: product.category },
    { label: 'Preço', value: `R$ ${product.price.toFixed(2)}` },
    { label: 'Avaliação', value: `${product.rating.rate} / 5` },
    { label: 'Votos', value: String(product.rating.count) },
  ]
}
