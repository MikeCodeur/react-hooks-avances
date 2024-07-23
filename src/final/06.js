"use client"
// useContext
// http://localhost:3000/alone/final/06.js

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

const ThemeContext = React.createContext(themes.light)

function Toolbar() {
  return (
    <div>
      <Button />
      <List />
    </div>
  )
}
function Button() {
  const theme = React.useContext(ThemeContext)
  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      Envoyer
    </button>
  )
}
function List() {
  const theme = React.useContext(ThemeContext)
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
  const theme = React.useContext(ThemeContext)
  return <li style={{...theme.li}}>{children}</li>
}

function CheckBox({darkMode, onChange}) {
  const theme = React.useContext(ThemeContext)

  const handleCheck = e => {
    onChange(e.target.checked)
  }
  return (
    <label style={{background: theme.background, color: theme.foreground}}>
      <input type="checkbox" checked={darkMode} onChange={handleCheck} />{' '}
      utiliser le DarkMode ?
    </label>
  )
}

function App() {
  const [darkMode, setDarkMode] = React.useState(false)
  const theme = darkMode ? themes.dark : themes.light
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <CheckBox darkMode={darkMode} onChange={setDarkMode} />
        <Toolbar />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
