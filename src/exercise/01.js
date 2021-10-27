// useReducer
// http://localhost:3000/alone/exercise/01.js

/* eslint-disable no-unused-vars */
import * as React from 'react'

// 🐶 retourne la bonne valeur dans le reducer
// On veut avoir le meme comportement que useState
// la valeur retouné du reducer doit etre le nouveau state
const reducer = (prevState, newState) => {}

function Compteur() {
  // 🐶 créé un hook 'useReducer' qui utilise la fonction 'reducer' crée plus haut et 0 en valeur par défaut
  // 🤖 const [count, setCount] = React.useReducer

  // 🐶 Utilise le state `count` pour la value du input
  // 🐶 Utilise `setCount(count + 1)` pour le 'onClick'
  return <input type="button" onClick={() => {}} value={0} />
}

function App() {
  return <Compteur />
}

export default App
