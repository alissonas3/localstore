import { render, screen, fireEvent } from '@testing-library/react'
import { ProductList } from '@/components/products/ProductList'
import { useProducts } from '@/hooks/useProducts'
import { mockProducts } from '../mocks/products'

jest.mock('@/hooks/useProducts')
const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>

describe('ProductList', () => {
  test('exibe skeletons durante carregamento', () => {
    mockUseProducts.mockReturnValue({ data: [], isLoading: true, isError: false } as any)
    render(<ProductList />)
    expect(screen.queryByText('Produto 1')).not.toBeInTheDocument()
  })

  test('exibe alerta de erro quando isError é true', () => {
    mockUseProducts.mockReturnValue({ data: [], isLoading: false, isError: true } as any)
    render(<ProductList />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('renderiza apenas 12 produtos na primeira página', () => {
    mockUseProducts.mockReturnValue({ data: mockProducts, isLoading: false, isError: false } as any)
    render(<ProductList />)
    expect(screen.getByText('Produto 1')).toBeInTheDocument()
    expect(screen.getByText('Produto 12')).toBeInTheDocument()
    expect(screen.queryByText('Produto 13')).not.toBeInTheDocument()
  })

  test('navegar para página 2 exibe os próximos produtos', () => {
    mockUseProducts.mockReturnValue({ data: mockProducts, isLoading: false, isError: false } as any)
    render(<ProductList />)
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))
    expect(screen.getByText('Produto 13')).toBeInTheDocument()
    expect(screen.queryByText('Produto 1')).not.toBeInTheDocument()
  })
})
