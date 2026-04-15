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
  expect(screen.getByText(`${product.category} | $${product.price.toFixed(2)}`)).toBeInTheDocument()
})

test('renderiza a imagem com alt correto', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByAltText(product.title)).toBeInTheDocument()
})

test('renderiza a categoria', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByText(new RegExp(product.category, 'i'))).toBeInTheDocument()
})

test('link "Ver mais" aponta para a rota correta', () => {
  render(<ProductCard product={product} />)
  expect(screen.getByRole('link', { name: /ver mais/i }))
    .toHaveAttribute('href', `/product/${product.id}`)
})
