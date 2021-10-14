// Hook personnalisé
// 🚀 Creation d'un composant personalisé
// http://localhost:3000/alone/final/02.bonus-2.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchMarvel,
  MarvelSearchForm,
  ErrorDisplay,
  MarvelPersoView,
} from '../marvel'
import '../02-styles.css'

const reducer = (state, action) => ({...state, ...action})

function useFindMarvelByName(marvelName) {
  const [state, dispatch] = React.useReducer(reducer, {
    marvel: null,
    error: null,
  })

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    dispatch({error: null})
    dispatch({marvel: null})

    fetchMarvel(marvelName)
      .then(marvel => dispatch({marvel}))
      .catch(error => dispatch({error}))
  }, [marvelName])

  return state
}

function Marvel({marvelName}) {
  const state = useFindMarvelByName(marvelName)
  const {error, marvel} = state
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {marvel ? <MarvelPersoView marvel={marvel} /> : `Le marvel n'existe pas`}
    </div>
  )
}
function App() {
  const [marvelName, setMarvelName] = React.useState('')
  const handleSearch = name => {
    setMarvelName(name)
  }
  return (
    <div className="marvel-app">
      <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
      <div className="marvel-detail">
        <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
          <Marvel marvelName={marvelName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
