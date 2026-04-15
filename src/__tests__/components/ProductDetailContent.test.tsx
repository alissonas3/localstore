import { render, screen } from '@testing-library/react'
import { ProductDetailContent } from '@/components/products/ProductDetailContent'
import { mockProducts } from '../mocks/products'

const product = mockProducts[0]

describe('ProductDetailContent', () => {
  it('renderiza o título do produto', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(product.title)).toBeInTheDocument()
  })

  it('renderiza a descrição do produto', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(product.description)).toBeInTheDocument()
  })

  it('renderiza o preço formatado em R$', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renderiza a categoria', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(product.category)).toBeInTheDocument()
  })

  it('renderiza a avaliação no formato "X / 5"', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(`${product.rating.rate} / 5`)).toBeInTheDocument()
  })

  it('renderiza o número de votos', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText(String(product.rating.count))).toBeInTheDocument()
  })

  it('exibe os cabeçalhos de seção', () => {
    render(<ProductDetailContent product={product} />)
    expect(screen.getByText('Informações')).toBeInTheDocument()
    expect(screen.getByText('Sobre o produto')).toBeInTheDocument()
  })
})
