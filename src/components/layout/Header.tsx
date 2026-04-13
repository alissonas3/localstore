'use client'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}
        >
          LocalStore
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
