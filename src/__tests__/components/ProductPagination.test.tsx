import { render, screen, fireEvent } from '@testing-library/react'
import { ProductPagination } from '@/components/products/ProductPagination'

describe('ProductPagination', () => {
  it('não renderiza nada quando totalPages é 1', () => {
    const { container } = render(
      <ProductPagination totalPages={1} currentPage={1} onPageChange={jest.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('não renderiza nada quando totalPages é 0', () => {
    const { container } = render(
      <ProductPagination totalPages={0} currentPage={1} onPageChange={jest.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('renderiza quando totalPages é maior que 1', () => {
    render(<ProductPagination totalPages={3} currentPage={1} onPageChange={jest.fn()} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('chama onPageChange ao clicar em uma página', () => {
    const onPageChange = jest.fn()
    render(<ProductPagination totalPages={3} currentPage={1} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })
})
