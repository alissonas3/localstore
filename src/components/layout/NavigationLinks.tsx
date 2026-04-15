'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { NavLink } from '@/lib/navigation'

const PRIMARY = '#01602A'

interface NavigationLinksProps {
  items: NavLink[]
  activeHref: string
}

export function NavigationLinks({ items, activeHref }: NavigationLinksProps) {
  return (
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
      {items.map(({ label, href }) => {
        const active = activeHref === href
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
  )
}
