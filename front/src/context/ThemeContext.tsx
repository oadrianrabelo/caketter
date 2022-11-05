import React, { createContext, useEffect, useState } from 'react'

function useLocalStorage(
  key: string,
  initialValue: string
): [string, Function] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  const setValue = (valueToStore: string): void => {
    try {
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

interface ContextProps {
  theme: string
  setTheme: Function
}

export const ThemeContext = createContext<ContextProps>({
  theme: '',
  setTheme: () => null,
})

interface Props {
  children: React.ReactNode
}

export function ThemeProvider(props: Props): JSX.Element {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}