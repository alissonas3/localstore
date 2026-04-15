'use client'

import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'

interface ProductPaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function ProductPagination({ totalPages, currentPage, onPageChange }: ProductPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
      />
    </Box>
  )
}
