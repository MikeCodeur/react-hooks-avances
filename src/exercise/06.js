// Hook Perso
// http://localhost:3000/alone/exercise/04.js

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

// 🐶 créé un context vers l'objet 'themes' avec l'API context (utilise le thème light par défaut)
// 🤖 const ThemeContext = React.createContext(themes.light)

// 🐶 Toolbar permet de propager theme aux enfants : ici on en a plus besoin
function Toolbar({theme}) {
  // ⛏️ supprime toutes les références à 'theme'
  return (
    <div>
      <Button theme={theme} />
      <List theme={theme} />
    </div>
  )
}

// 🐶 Utilise le theme venant de l'API context et non du prop
// ⛏️ supprime le prop 'theme'
function Button({theme}) {
  // 🐶 utilise le hook useContext pour accéder à theme
  // 🤖 const theme = React.useContext(ThemeContext)
  return (
    <button style={{background: theme.background, color: theme.foreground}}>
      Envoyer
    </button>
  )
}

// 🐶 Passe par 'useContext'
function List({theme}) {
  const items = ['react', 'angular', 'vue']
  return (
    <ul style={{...theme.ul}}>
      {items.map(item => {
        return <Item theme={theme}>{item}</Item>
      })}
    </ul>
  )
}
// 🐶 Passe par 'useContext'
function Item({children, theme}) {
  return <li style={{...theme.li}}>{children}</li>
}
// 🐶 Passe par 'useContext'
function CheckBox({darkMode, onChange, theme}) {
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
      {/* 🐶 Utilise le provider de l'api context comme parent de tous les composants qui ont besoin du theme */}
      {/* Initilise la valeur du provider avec 'theme'*/}
      {/* 🤖 <ThemeContext.Provider value={theme}> */}

      {/* ⛏️ supprime les props 'theme' */}
      <CheckBox theme={theme} darkMode={darkMode} onChange={setDarkMode} />
      <Toolbar theme={theme} />
    </div>
  )
}

export default App
