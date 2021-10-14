// useReducer
// http://localhost:3000/alone/exercise/01.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import calculate from '../logic/calculate'
import '../01-styles.css'

// 🐶 va en bas dans App() finir le refactoring classe Hook
function Display({value}) {
  return (
    <div className="component-display">
      <div>{value}</div>
    </div>
  )
}
function Button({name, orange, wide, clickHandler}) {
  const handleClick = () => {
    clickHandler(name)
  }

  const className = [
    'component-button',
    orange ? 'orange' : '',
    wide ? 'wide' : '',
  ]
  return (
    <div className={className.join(' ').trim()}>
      <button onClick={handleClick}>{name}</button>
    </div>
  )
}
function ButtonPanel({clickHandler}) {
  const handleClick = buttonName => {
    clickHandler(buttonName)
  }

  return (
    <div className="component-button-panel">
      <div>
        <Button name="AC" clickHandler={handleClick} />
        <Button name="+/-" clickHandler={handleClick} />
        <Button name="%" clickHandler={handleClick} />
        <Button name="÷" clickHandler={handleClick} orange />
      </div>
      <div>
        <Button name="7" clickHandler={handleClick} />
        <Button name="8" clickHandler={handleClick} />
        <Button name="9" clickHandler={handleClick} />
        <Button name="x" clickHandler={handleClick} orange />
      </div>
      <div>
        <Button name="4" clickHandler={handleClick} />
        <Button name="5" clickHandler={handleClick} />
        <Button name="6" clickHandler={handleClick} />
        <Button name="-" clickHandler={handleClick} orange />
      </div>
      <div>
        <Button name="1" clickHandler={handleClick} />
        <Button name="2" clickHandler={handleClick} />
        <Button name="3" clickHandler={handleClick} />
        <Button name="+" clickHandler={handleClick} orange />
      </div>
      <div>
        <Button name="0" clickHandler={handleClick} wide />
        <Button name="." clickHandler={handleClick} />
        <Button name="=" clickHandler={handleClick} orange />
      </div>
    </div>
  )
}

// 🐶 cette fonction sera utile plus tard
const reducer = (state, action) => {
  // 🐶 3. implemente la fonction reducer
  // retourne un tous les states et toutes les actions via un spread operator
  // 🤖 return {...state, ...action}
}

// 🐶 Converti en composant fonctionnel 
// renome 'class' en 'function' et supprime 'extends React.Component'
class App extends React.Component {

  // 🐶 Siumlation 'setState' avec 'useReducer' :
    // 1. créé un 'state'/'setState' avec 'useReducer'
    // 🤖 const [state, setState] = React.useReducer(reducer)
    // 2. ⛏️ déplace ces valeurs par défauts dans le 'useReducer' (2ème param de useReducer)
    state = {
      total: null,
      next: null,
      operation: null,
    };
    // 3. implemente la fonction reducer 
  
  // 🐶 ajoute `const` devant 'handleClick'
  handleClick = buttonName => {
    // ⛏️ supprime les références à this
    this.setState(calculate(this.state, buttonName));
  };

  // ⛏️ supprime 'render'
  render() {
    return (
      <div className="component-app">
        {/* ⛏️ supprime les references à this */}
        <Display value={this.state.next || this.state.total || "0"} />
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}

export default App



