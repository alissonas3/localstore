import { renderHook, act } from '@testing-library/react'
import { usePagination } from '@/hooks/usePagination'

const items = Array.from({ length: 25 }, (_, i) => i + 1)

describe('usePagination', () => {
  it('começa na página 1', () => {
    const { result } = renderHook(() => usePagination(items, 10))
    expect(result.current.page).toBe(1)
  })

  it('calcula o total de páginas corretamente', () => {
    const { result } = renderHook(() => usePagination(items, 10))
    expect(result.current.totalPages).toBe(3)
  })

  it('retorna os itens corretos da primeira página', () => {
    const { result } = renderHook(() => usePagination(items, 10))
    expect(result.current.visible).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('retorna os itens corretos após mudar de página', () => {
    const { result } = renderHook(() => usePagination(items, 10))
    act(() => result.current.setPage(2))
    expect(result.current.visible).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
  })

  it('retorna os itens restantes na última página', () => {
    const { result } = renderHook(() => usePagination(items, 10))
    act(() => result.current.setPage(3))
    expect(result.current.visible).toEqual([21, 22, 23, 24, 25])
  })

  it('retorna totalPages 1 quando itens cabem em uma página', () => {
    const { result } = renderHook(() => usePagination([1, 2, 3], 10))
    expect(result.current.totalPages).toBe(1)
  })

  it('retorna lista vazia quando items é vazio', () => {
    const { result } = renderHook(() => usePagination([], 10))
    expect(result.current.visible).toEqual([])
    expect(result.current.totalPages).toBe(0)
  })
})
