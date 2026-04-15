'use client'

import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { useProducts } from '@/hooks/useProducts'
import { usePagination } from '@/hooks/usePagination'
import { ProductGrid } from './ProductGrid'
import { ProductPagination } from './ProductPagination'

const ITEMS_PER_PAGE = 12

export function ProductList() {
  const { data: products = [], isLoading, isError } = useProducts()
  const { page, setPage, totalPages, visible } = usePagination(products, ITEMS_PER_PAGE)

  if (isError) {
    return <Alert severity="error">Erro ao carregar produtos. Tente novamente.</Alert>
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Produtos
      </Typography>

      <ProductGrid products={visible} isLoading={isLoading} itemsPerPage={ITEMS_PER_PAGE} />

      {!isLoading && (
        <ProductPagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  )
}
