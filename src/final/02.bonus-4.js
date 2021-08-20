// Hook personnalisé
// 🚀 Gérer le chargement avec un status
// http://localhost:3000/alone/final/02.bonus-1.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchMarvel, MarvelSearchForm, ErrorDisplay,MarvelPersoView} from '../marvel'
import '../02-styles.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {status:'fetching', marvel: null, error: null}
    case 'done':
      return {status:'done', marvel: action.payload, error: null}
    case 'fail':
      return  {status:'fail', marvel: null, error: action.error}
    default:
      throw new Error('Action non supporté')
  }
}

function useFindMarvelByName(marvelName) {
  const [state, dispatch] = React.useReducer(reducer, {
    marvel: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    dispatch({type: 'fetching'})
    fetchMarvel(marvelName)
      .then((marvel) => dispatch({type: 'done', payload: marvel}))
      .catch((error) => dispatch({type: 'fail', error}))
  }, [marvelName])

  return state
}

function Marvel({marvelName}) {
  const state = useFindMarvelByName(marvelName)
  const {error,marvel,status} = state
  if (status === 'fail') {
    throw error 
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return (
      <MarvelPersoView marvel={marvel} />
    )
  }
}

function App() {
  const [marvelName,setMarvelName] = React.useState('')
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
