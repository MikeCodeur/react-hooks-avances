// useContext
// 🚀 hook : context consumer
// http://localhost:3000/alone/final/06.bonus-2.js

import * as React from 'react'

const themes = {
  light: {
    ul: {listStyleType: 'square'},
    li: {background: '#eeeeee', color: '#000000'},
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    ul: {listStyleImage: "url('https://www.w3schools.com/css/sqpurple.gif')"},
    li: {background: '#222222', color: 'white'},
    foreground: '#ffffff',
    background: '#222222',
  },
}

const ThemeContext = React.createContext()

function ThemeProvider(props) {
  const [theme, setTheme] = React.useState(themes.light)
  const value = [theme, setTheme]
  // équivalent à
  // const value = React.useState()
  return <ThemeContext.Provider value={value} {...props} />
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit etre dans ThemeProvider')
  }
  return context
}

function Toolbar() {
  return (
    <div>
      <Button />
      <List />
    </div>
  )
}
function Button() {
  const [theme] = useTheme()
  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      Envoyer
    </button>
  )
}
function List() {
  const [theme] = useTheme()
  const items = ['react', 'angular', 'vue']
  return (
    <ul style={{...theme.ul}}>
      {items.map((item, index) => {
        return <Item key={index}>{item}</Item>
      })}
    </ul>
  )
}
function Item({children}) {
  const [theme] = useTheme()
  return <li style={{...theme.li}}>{children}</li>
}

function CheckBox() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [theme, setTheme] = useTheme()
  const handleCheck = e => {
    setDarkMode(e.target.checked)
    setTheme(e.target.checked ? themes.dark : themes.light)
  }
  return (
    <label style={{background: theme.background, color: theme.foreground}}>
      <input type="checkbox" checked={darkMode} onChange={handleCheck} />{' '}
      utiliser le DarkMode ?
    </label>
  )
}
function App() {
  return (
    <div>
      <ThemeProvider>
        <CheckBox />
        <Toolbar />
      </ThemeProvider>
    </div>
  )
}

export default App
