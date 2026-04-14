'use client'

import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from './ProductCard'

const ITEMS_PER_PAGE = 12

export function ProductList() {
  const { data: products = [], isLoading, isError } = useProducts()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
  const visible = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (isError) {
    return <Alert severity="error">Erro ao carregar produtos. Tente novamente.</Alert>
  }

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Produtos
      </Typography>

      <Grid container spacing={2}>
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
              </Grid>
            ))
          : visible.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
      </Grid>

      {!isLoading && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </>
  )
}
