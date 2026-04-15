import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

export function ProductDetailSkeleton() {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: { xs: 260, sm: 360, md: 440 },
          bgcolor: 'grey.100',
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4 },
        }}
      >
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
      </Box>
    </Box>
  )
}
