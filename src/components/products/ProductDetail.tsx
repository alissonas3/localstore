'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import { useProduct } from '@/hooks/useProduct'

export function ProductDetail({ id }: { id: number }) {
  const { data: product, isLoading, isError } = useProduct(id)

  if (isError) {
    return <Alert severity="error">Produto não encontrado.</Alert>
  }

  return (
    <Grid container spacing={4}>
      {/* Coluna da imagem */}
      <Grid size={{ xs: 12, md: 5 }}>
        {isLoading ? (
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        ) : (
          <Box
            component="img"
            src={product!.image}
            alt={product!.title}
            sx={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'contain',
              borderRadius: 2,
              bgcolor: 'grey.50',
              p: 3,
            }}
          />
        )}
      </Grid>

      {/* Coluna das informações */}
      <Grid size={{ xs: 12, md: 7 }}>
        {isLoading ? (
          <>
            <Skeleton width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton width="30%" height={48} sx={{ mb: 2 }} />
            <Skeleton width="20%" height={28} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={100} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={48} />
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              {product!.title}
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              ${product!.price.toFixed(2)}
            </Typography>
            <Chip
              label={product!.category}
              size="small"
              sx={{ mb: 2, textTransform: 'capitalize' }}
            />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {product!.description}
            </Typography>
            <Button variant="contained" size="large" fullWidth>
              Adicionar ao carrinho
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  )
}
