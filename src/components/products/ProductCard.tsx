'use client'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import type { IProduct } from '@/types/product'

export function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          href={`/product/${product.id}`}
          size="small"
          variant="contained"
          fullWidth
        >
          Ver detalhes
        </Button>
      </CardActions>
    </Card>
  )
}
