import { useState } from 'react'

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const visible = items.slice(startIndex, startIndex + itemsPerPage)

  return { page, setPage, totalPages, visible }
}
