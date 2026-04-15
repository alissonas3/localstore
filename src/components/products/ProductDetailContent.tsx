import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { IProduct } from '@/types/product'
import { buildProductInfoItems } from '@/lib/productDisplay'
import { InfoItem } from './InfoItem'

interface ProductDetailContentProps {
  product: IProduct
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const infoItems = buildProductInfoItems(product)

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        px: { xs: 3, md: 5 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {product.title}
      </Typography>

      <Typography
        variant="overline"
        sx={{ fontWeight: 700, color: 'text.primary', letterSpacing: 0.5 }}
      >
        Informações
      </Typography>

      <Grid container spacing={3} sx={{ mt: 0.5, mb: 3 }}>
        {infoItems.map(({ label, value }) => (
          <Grid key={label} size={{ xs: 6, sm: 3 }}>
            <InfoItem label={label} value={value} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Sobre o produto
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        {product.description}
      </Typography>
    </Box>
  )
}
