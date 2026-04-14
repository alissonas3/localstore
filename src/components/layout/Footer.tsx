'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#01602A', color: 'grey.300', mt: 'auto', py: 2 }}
    >
      <Container maxWidth="lg">

        {/* Linha superior: logo + redes sociais */}
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'grey.300', mr: 1 }}>
              Acompanhe nossas redes sociais:
            </Typography>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              size="small"
              sx={{ color: 'grey.300' }}
            >
              <YouTubeIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              size="small"
              sx={{ color: 'grey.300' }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              size="small"
              sx={{ color: 'grey.300' }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              size="small"
              sx={{ color: 'grey.300' }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Linha inferior: copyright + links legais */}
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
