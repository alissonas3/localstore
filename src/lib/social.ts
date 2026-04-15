import { ElementType } from 'react'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

export interface SocialLink {
  icon: ElementType
  href: string
  label: string
}

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { icon: YouTubeIcon, href: 'https://youtube.com', label: 'YouTube' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter / X' },
  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
]
