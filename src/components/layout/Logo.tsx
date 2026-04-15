import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from 'next/link'

const PRIMARY = '#01602A'

export function Logo() {
  return (
    <Typography
      component={Link}
      href="/"
      variant="h6"
      sx={{
        color: PRIMARY,
        textDecoration: 'none',
        fontWeight: 800,
        letterSpacing: '-0.5px',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      Local
      <Box component="span" sx={{ fontWeight: 300, color: 'text.secondary' }}>
        Store
      </Box>
    </Typography>
  )
}
