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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'grey.200',
        boxShadow: 'none',
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ height: 200, objectFit: 'contain', p: 3 }}
      />
      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {product.category} | ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          component={Link}
          href={`/product/${product.id}`}
          variant="outlined"
          color="inherit"
          size="small"
          fullWidth
          sx={{
            borderColor: 'primary.main',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            },
          }}
        >
          Ver mais
        </Button>
      </CardActions>
    </Card>
  )
}
