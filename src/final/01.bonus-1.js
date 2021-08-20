// Styling
// 🚀 type d'action
// http://localhost:3000/alone/final/01.bonus-1.js

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
  const [count, setCount] = React.useReducer(reducer, 0)
  return (
    <div>
      <input
        type="button"
        onClick={() => setCount({type: 'INCREMENT'})}
        value={`incrémenter ${count}`}
      />
      <input
        type="button"
        onClick={() => setCount({type: 'DECREMENT'})}
        value={`décrémenter ${count}`}
      />
      <input
        type="button"
        onClick={() => setCount({type: 'RESET'})}
        value={`reset ${count}`}
      />
    </div>
  )
}

function App() {
  return <Compteur />
}

export default App
