'use client'

import { useEffect, useState } from 'react'
import { useThemeStore } from '@/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(theme)
    }
  }, [theme, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
