import { buildProductInfoItems } from '@/lib/productDisplay'
import { mockProducts } from '../mocks/products'

const product = mockProducts[0]

describe('buildProductInfoItems', () => {
  it('retorna 4 itens', () => {
    expect(buildProductInfoItems(product)).toHaveLength(4)
  })

  it('formata o preço com R$ e duas casas decimais', () => {
    const items = buildProductInfoItems(product)
    const preco = items.find((i) => i.label === 'Preço')
    expect(preco?.value).toBe(`R$ ${product.price.toFixed(2)}`)
  })

  it('exibe a categoria corretamente', () => {
    const items = buildProductInfoItems(product)
    const categoria = items.find((i) => i.label === 'Categoria')
    expect(categoria?.value).toBe(product.category)
  })

  it('formata a avaliação como "X / 5"', () => {
    const items = buildProductInfoItems(product)
    const avaliacao = items.find((i) => i.label === 'Avaliação')
    expect(avaliacao?.value).toBe(`${product.rating.rate} / 5`)
  })

  it('exibe o número de votos como string', () => {
    const items = buildProductInfoItems(product)
    const votos = items.find((i) => i.label === 'Votos')
    expect(votos?.value).toBe(String(product.rating.count))
  })
})
