// useReducer
// 🚀 disptach functions
// http://localhost:3000/alone/final/01.bonus-2.js

import * as React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      throw new Error('Action non supporté')
  }
}

function Compteur() {
  const [count, dispatch] = React.useReducer(reducer, 0)
  const increment = () => {
    dispatch({type: 'INCREMENT'})
  }
  const decrement = () => {
    dispatch({type: 'DECREMENT'})
  }
  const reset = () => {
    dispatch({type: 'RESET'})
  }
  return (
    <div>
      <input
        type="button"
        onClick={() => increment()}
        value={`incrémenter ${count}`}
      />
      <input
        type="button"
        onClick={() => decrement()}
        value={`décrémenter ${count}`}
      />
      <input type="button" onClick={() => reset()} value={`reset ${count}`} />
    </div>
  )
}

function App() {
  return <Compteur />
}

export default App
