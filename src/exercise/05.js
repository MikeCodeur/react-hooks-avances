// Hook Perso
// http://localhost:3000/alone/exercise/04.js

import * as React from 'react'
import '../04-styles.css'

// 🐶 Utilise `React.forwardRef` pour wrapper le composant avec la 'ref' parente.
// Grace à cet référence tu pourras utiliser `useImperativeHandle`
// 🤖 const Composant = React.forwardRef(function Composant({onsubmit} , ref) {
function Composant({onsubmit}) {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef()
  const buttonRef = React.useRef()

  // 🐶 créé une fonction 'focusInput' qui donne le focus à l'input `inputRef.current.focus()`

  // 🐶 créé une fonction 'focusButton' qui donne le focus à l'input `buttonRef.current.focus()`

  // 🤖 Utilise `React.useImperativeHandle` en utilisant la 'ref' du composant parent
  // ainsi que les deux fonctions ('focusInput','focusButton') qui utilisent les ref internes.
  //
  // React.useImperativeHandle(ref, () => ({
  //   focusInput,
  //   focusButton,
  // }))

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      ></input>
      <input
        ref={buttonRef}
        type="button"
        value={'submit'}
        onClick={() => onsubmit(value)}
      ></input>
    </div>
  )
}

function App() {
  const [, setValue] = React.useState('')
  const [checked, setChecked] = React.useState('')

  // 🐶 créé une référence avec `React.useRef()`.
  // 🤖 const composantRef = React.useRef()
  // Ajoute ensuite 'composantRef' au composant <Composant ref

  // ⛏️ décommente ces 2 fonctions
  //const focusInput = () => composantRef.current.focusInput()
  //const focusButton = () => composantRef.current.focusButton()

  const handleCheck = e => {
    setChecked(e.target.checked)
    // ⛏️ décommente cette ligne pour appleler le focus boutton ou focus input.
    //e.target.checked ? focusInput() : focusButton()
  }
  return (
    <div>
      {/* 🐶 n'oublie pas 'composantRef'*/}
      <Composant /* 🤖 ref={composantRef}*/ onsubmit={setValue} />
      <label>
        <input type="checkbox" checked={checked} onChange={handleCheck} /> Focus
        sur input / button ?
      </label>
    </div>
  )
}

export default App
