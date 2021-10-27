// useReducer
// 🚀 State Objet
// http://localhost:3000/alone/final/01.bonus-4.js

import * as React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + action.payload}
    case 'DECREMENT':
      return {count: state.count - action.payload}
    case 'RESET':
      return {count: 0}
    default:
      throw new Error('Action non supporté')
  }
}

function Compteur() {
  const [state, dispatch] = React.useReducer(reducer, {count: 0})
  const increment = (step = 1) => {
    dispatch({type: 'INCREMENT', payload: step})
  }
  const decrement = (step = 1) => {
    dispatch({type: 'DECREMENT', payload: step})
  }
  const reset = () => {
    dispatch({type: 'RESET'})
  }
  return (
    <div>
      <input
        type="button"
        onClick={() => increment(10)}
        value={`incrémenter 10 :  ${state.count}`}
      />
      <input
        type="button"
        onClick={() => decrement(5)}
        value={`décrémenter 5 :  ${state.count}`}
      />
      <input
        type="button"
        onClick={() => reset()}
        value={`reset ${state.count}`}
      />
    </div>
  )
}

function App() {
  return <Compteur />
}

export default App
