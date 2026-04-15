'use client'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { useProduct } from '@/hooks/useProduct'
import { ProductDetailSkeleton } from './ProductDetailSkeleton'
import { ProductDetailContent } from './ProductDetailContent'

interface ProductDetailProps {
  id: number
}

export function ProductDetail({ id }: ProductDetailProps) {
  const { data: product, isLoading, isError } = useProduct(id)

  if (isError) {
    return <Alert severity="error">Produto não encontrado.</Alert>
  }

  if (isLoading) {
    return <ProductDetailSkeleton />
  }

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: { xs: 260, sm: 360, md: 440 },
          bgcolor: 'grey.100',
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Box
          component="img"
          src={product!.image}
          alt={product!.title}
          sx={{
            maxHeight: '80%',
            maxWidth: '60%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <ProductDetailContent product={product!} />
    </Box>
  )
}
