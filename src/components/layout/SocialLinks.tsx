import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { SocialLink } from '@/lib/social'

interface SocialLinksProps {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant="body2" sx={{ color: 'grey.300', mr: 1 }}>
        Acompanhe nossas redes sociais:
      </Typography>
      {links.map(({ icon: Icon, href, label }) => (
        <IconButton
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          size="small"
          sx={{ color: 'grey.300' }}
        >
          <Icon fontSize="small" />
        </IconButton>
      ))}
    </Box>
  )
}
