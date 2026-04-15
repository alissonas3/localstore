import { render, screen } from '@testing-library/react'
import { ProductDetail } from '@/components/products/ProductDetail'
import { useProduct } from '@/hooks/useProduct'
import { mockProducts } from '../mocks/products'

jest.mock('@/hooks/useProduct')
const mockUseProduct = useProduct as jest.MockedFunction<typeof useProduct>

const product = mockProducts[0]

describe('ProductDetail', () => {
  test('exibe alerta quando produto não é encontrado', () => {
    mockUseProduct.mockReturnValue({ data: undefined, isLoading: false, isError: true } as any)
    render(<ProductDetail id={1} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('renderiza título do produto', () => {
    mockUseProduct.mockReturnValue({ data: product, isLoading: false, isError: false } as any)
    render(<ProductDetail id={1} />)
    expect(screen.getByText(product.title)).toBeInTheDocument()
  })

  test('renderiza descrição do produto', () => {
    mockUseProduct.mockReturnValue({ data: product, isLoading: false, isError: false } as any)
    render(<ProductDetail id={1} />)
    expect(screen.getByText(product.description)).toBeInTheDocument()
  })

  test('renderiza preço formatado', () => {
    mockUseProduct.mockReturnValue({ data: product, isLoading: false, isError: false } as any)
    render(<ProductDetail id={1} />)
    expect(screen.getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument()
  })

  test('renderiza categoria como chip', () => {
    mockUseProduct.mockReturnValue({ data: product, isLoading: false, isError: false } as any)
    render(<ProductDetail id={1} />)
    expect(screen.getByText(product.category)).toBeInTheDocument()
  })
})
