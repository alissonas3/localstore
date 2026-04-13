'use client'

import ThemeRegistry from './ThemeRegistry'
import { Providers } from './Providers'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <Providers>{children}</Providers>
    </ThemeRegistry>
  )
}
