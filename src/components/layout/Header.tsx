'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { usePathname } from 'next/navigation'
import { NavLink, DEFAULT_NAV_LINKS } from '@/lib/navigation'
import { Logo } from './Logo'
import { NavigationLinks } from './NavigationLinks'
import { HeaderActions } from './HeaderActions'

interface HeaderProps {
  navItems?: NavLink[]
}

export function Header({ navItems = DEFAULT_NAV_LINKS }: HeaderProps) {
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
        <Logo />
        <NavigationLinks items={navItems} activeHref={pathname} />
        <HeaderActions />
      </Toolbar>
    </AppBar>
  )
}
