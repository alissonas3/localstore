'use client'

import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'
import { IProduct } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: IProduct[]
  isLoading: boolean
  itemsPerPage?: number
}

export function ProductGrid({ products, isLoading, itemsPerPage = 12 }: ProductGridProps) {
  return (
    <Grid container spacing={2}>
      {isLoading
        ? Array.from({ length: itemsPerPage }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
            </Grid>
          ))
        : products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
    </Grid>
  )
}
