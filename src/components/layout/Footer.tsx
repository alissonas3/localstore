'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, mt: 'auto', bgcolor: 'grey.100' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} LocalStore
        </Typography>
      </Container>
    </Box>
  )
}
