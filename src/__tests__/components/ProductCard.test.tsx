import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/products/ProductCard'
import { mockProducts } from '../mocks/products'

const product = mockProducts[0]

test('renderiza o título do produto', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByText(product.title)).toBeInTheDocument()
})

test('renderiza o preço formatado', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument()
})

test('renderiza a imagem com alt correto', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByAltText(product.title)).toBeInTheDocument()
})

test('renderiza a categoria', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByText(product.category)).toBeInTheDocument()
})

test('link "Ver detalhes" aponta para a rota correta', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByRole('link', { name: /ver detalhes/i }))
    .toHaveAttribute('href', `/product/${product.id}`)
})
