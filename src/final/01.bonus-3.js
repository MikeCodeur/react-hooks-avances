"use client"
// useReducer
// 🚀 Payload
// http://localhost:3000/alone/final/01.bonus-3.js

import * as React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload
    case 'DECREMENT':
      return state - action.payload
    case 'RESET':
      return 0
    default:
      throw new Error('Action non supporté')
  }
}

function Compteur() {
  const [count, dispatch] = React.useReducer(reducer, 0)
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
        value={`incrémenter 10 :  ${count}`}
      />
      <input
        type="button"
        onClick={() => decrement(5)}
        value={`décrémenter 5 :  ${count}`}
      />
      <input type="button" onClick={() => reset()} value={`reset ${count}`} />
    </div>
  )
}

function App() {
  return <Compteur />
}

export default App
