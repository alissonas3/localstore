'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import { useProduct } from '@/hooks/useProduct'
import { IProduct } from '@/types/product'

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block', mb: 0.25 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  )
}

function buildInfoItems(product: IProduct) {
  return [
    { label: 'Categoria', value: product.category },
    { label: 'Preço', value: `R$ ${product.price.toFixed(2)}` },
    { label: 'Avaliação', value: `${product.rating.rate} / 5` },
    { label: 'Votos', value: String(product.rating.count) },
  ]
}

export function ProductDetail({ id }: { id: number }) {
  const { data: product, isLoading, isError } = useProduct(id)

  if (isError) {
    return <Alert severity="error">Produto não encontrado.</Alert>
  }

  return (
    <Box>
      {/* Hero banner */}
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
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
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
        )}
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
        }}
      >
        {isLoading ? (
          <>
            <Skeleton width="55%" height={40} sx={{ mb: 2 }} />
            <Skeleton width="15%" height={20} sx={{ mb: 2 }} />
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Grid key={i} size={{ xs: 6, sm: 3 }}>
                  <Skeleton width="60%" height={14} sx={{ mb: 0.5 }} />
                  <Skeleton width="80%" height={18} />
                </Grid>
              ))}
            </Grid>
            <Skeleton variant="rectangular" height={1} sx={{ mb: 3 }} />
            <Skeleton width="40%" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={80} />
          </>
        ) : (
          <>
            {/* Título */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {product!.title}
            </Typography>

            {/* Seção: Informações */}
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: 0.5 }}
            >
              Informações
            </Typography>

            <Grid container spacing={3} sx={{ mt: 0.5, mb: 3 }}>
              {buildInfoItems(product!).map(({ label, value }) => (
                <Grid key={label} size={{ xs: 6, sm: 3 }}>
                  <InfoItem label={label} value={value} />
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {/* Seção: Descrição */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Sobre o produto
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {product!.description}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}
