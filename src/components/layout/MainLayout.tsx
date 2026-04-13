'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <Footer />
    </>
  )
}
