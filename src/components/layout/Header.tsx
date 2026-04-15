'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'O Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Quem somos', href: '/quem-somos' },
  { label: 'Contato', href: '/contato' },
]

const PRIMARY = '#01602A'

export function Header() {
  const pathname = usePathname()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>

        {/* Logo */}
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

        {/* Navegação central */}
        <Box
          component="nav"
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 4,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href
            return (
              <Typography
                key={href}
                component={Link}
                href={href}
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  fontWeight: active ? 600 : 400,
                  color: active ? PRIMARY : 'text.secondary',
                  position: 'relative',
                  pb: 0.5,
                  letterSpacing: 0.2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: active ? '100%' : '0%',
                    height: '2px',
                    bgcolor: PRIMARY,
                    transition: 'width 0.2s ease',
                  },
                  '&:hover': { color: PRIMARY },
                  '&:hover::after': { width: '100%' },
                }}
              >
                {label}
              </Typography>
            )
          })}
        </Box>

        {/* Ícones de ação */}
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
          <IconButton aria-label="Perfil do usuário" size="medium" sx={{ color: 'text.secondary' }}>
            <AccountCircleOutlinedIcon />
          </IconButton>
          <IconButton aria-label="Carrinho de compras" size="medium" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={0} color="error" showZero={false}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  )
}
