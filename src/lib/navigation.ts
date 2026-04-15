export interface NavLink {
  label: string
  href: string
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'O Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Quem somos', href: '/quem-somos' },
  { label: 'Contato', href: '/contato' },
]
