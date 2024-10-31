'use client'

import { useState } from 'react'

export function useTheme() {
  const THEME = {
    LIGHT: 'light',
    DARK: 'dark',
  }
  const [theme, setTheme] = useState(THEME.LIGHT)

  const isDarkMode = () => theme === THEME.DARK

  const setDarkMode = () => setTheme(THEME.DARK)
  const setLightMode = () => setTheme(THEME.LIGHT)

  return { theme, isDarkMode, setDarkMode, setLightMode }
}
