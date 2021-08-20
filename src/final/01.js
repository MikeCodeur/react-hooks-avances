// Styling
// http://localhost:3000/isolated/final/05.js

import * as React from 'react'

const reducer = (prevState, newState) => {
  return newState
}

function Compteur() {
  const [count, setCount] = React.useReducer(reducer,0);
  return  <input type="button" onClick={()=> setCount(count + 1)} value={count}/>  
}

function App() {
  return <Compteur />
}

export default App
