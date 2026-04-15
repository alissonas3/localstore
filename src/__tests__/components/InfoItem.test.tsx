import { render, screen } from '@testing-library/react'
import { InfoItem } from '@/components/products/InfoItem'

describe('InfoItem', () => {
  it('renderiza o label', () => {
    render(<InfoItem label="Categoria" value="electronics" />)
    expect(screen.getByText('Categoria')).toBeInTheDocument()
  })

  it('renderiza o valor', () => {
    render(<InfoItem label="Categoria" value="electronics" />)
    expect(screen.getByText('electronics')).toBeInTheDocument()
  })

  it('renderiza label e valor independentes', () => {
    render(<InfoItem label="Preço" value="R$ 99.90" />)
    expect(screen.getByText('Preço')).toBeInTheDocument()
    expect(screen.getByText('R$ 99.90')).toBeInTheDocument()
  })
})
