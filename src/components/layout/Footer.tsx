'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import { SocialLink, DEFAULT_SOCIAL_LINKS } from '@/lib/social'
import { SocialLinks } from './SocialLinks'

interface FooterProps {
  socialLinks?: SocialLink[]
}

export function Footer({ socialLinks = DEFAULT_SOCIAL_LINKS }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#01602A', color: 'grey.300', mt: 'auto', py: 2 }}
    >
      <Container maxWidth="lg">

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: 'white', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1 }}
          >
            Local
            <Box component="span" sx={{ fontWeight: 300, opacity: 0.85 }}>
              Store
            </Box>
          </Typography>

          <SocialLinks links={socialLinks} />
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ pt: 1 }}>
          <Typography variant="caption" sx={{ color: 'grey.400' }}>
            LocalStore © {new Date().getFullYear()} •{' '}
            <Link href="/politica-de-privacidade" color="inherit" underline="hover">
              Política de Privacidade
            </Link>
            {' • '}
            <Link href="/termos-de-uso" color="inherit" underline="hover">
              Termos de Uso
            </Link>
          </Typography>
        </Box>

      </Container>
    </Box>
  )
}
