import type { IProduct } from '@/types/product'

export const mockProducts: IProduct[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Produto ${i + 1}`,
  price: 10 + i,
  description: `Descrição do produto ${i + 1}`,
  category: i % 2 === 0 ? 'electronics' : 'clothing',
  image: `https://fakestoreapi.com/img/${i + 1}.jpg`,
  rating: { rate: 4.0, count: 100 },
}))
