import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

export function HeaderActions() {
  return (
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
  )
}
