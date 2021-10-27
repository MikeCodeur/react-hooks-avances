// Hook Perso
// http://localhost:3000/alone/exercise/02.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchMarvel,
  fetchMarvelById,
  fetchMarvelsList,
  MarvelSearchForm,
  ErrorDisplay,
  MarvelPersoView,
} from '../marvel'
import '../02-styles.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {status: 'fetching', data: null, error: null}
    case 'done':
      return {status: 'done', data: action.payload, error: null}
    case 'fail':
      return {status: 'fail', data: null, error: action.error}
    default:
      throw new Error('Action non supporté')
  }
}

// ⛏️ supprime 'search' il sera extrait dans 'useCallback' plus tard
// 🐶 renomme 'fetch' en 'callback' pour plus de clarté
function useFetchData(search, fetch) {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    // 🐶 fais un appel à la fonction 'callback' (qui retoune une 'promise')
    // 🤖 const promise = callback()

    // 🐶 sors de la fonction si  'promise' n'est pas défini
    if (!search) {
      return
    }
    dispatch({type: 'fetching'})

    // ⛏️ supprime `fetch(search)` et utilise `promise`
    fetch(search)
      .then(marvel => dispatch({type: 'done', payload: marvel}))
      .catch(error => dispatch({type: 'fail', error}))
    // 🐶 adapte les dépendances pour que le useEffect ne s'excute sur la modification de 'callback'
  }, [search, fetch])

  return state
}

// 🐶 Modifie ce hook pour qu'il passe une fonction mémoïsé à 'useFetchData'
function useFindMarvelList(marvelName) {
  // 🐶 créé un callback avec `React.useCallback`
  // 🤖 const cb = React.useCallback(param1, param2)
  // 1. param1 est une fonction qui :
  //    - retourne rien si 'marvelName' n'est pas défini
  //    - return fetchMarvel(marvelName) si 'marvelName' n'est pas défini
  // 2. param2 les dépendances (marvelName dans ce cas)

  // ⛏️ supprime le paramètre 'marvelName'
  // 🐶 passe le callback à 'useFetchData'
  return useFetchData(marvelName, fetchMarvelsList)
}

// 🐶 Modifie ce hook pour qu'il passe une fonction mémoïsé à 'useFetchData'
function useFindMarvelByName(marvelName) {
  // 🐶 réptète l'opération
  return useFetchData(marvelName, fetchMarvel)
}

function Marvel({marvelName}) {
  const state = useFindMarvelByName(marvelName, fetchMarvelById)
  const {data: marvel, error, status} = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return <MarvelPersoView marvel={marvel} />
  }
}

function MarvelList({marvelName}) {
  const state = useFindMarvelList(marvelName, fetchMarvelById)
  const {data: marvels, error, status} = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return (
      <>
        {marvels.map(marvel => {
          return (
            <div key={marvel.id}>
              <hr style={{background: 'grey'}} />
              <MarvelPersoView marvel={marvel} />
            </div>
          )
        })}
      </>
    )
  }
}

function App() {
  const [marvelName, setMarvelName] = React.useState('')
  const [searchList, setSearchList] = React.useState('')
  const handleSearch = name => {
    setMarvelName(name)
  }
  return (
    <div className="marvel-app">
      <label>
        <input
          type="checkbox"
          checked={searchList}
          onChange={e => setSearchList(e.target.checked)}
        />{' '}
        Chercher une liste ?
      </label>
      <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
      <div className="marvel-detail">
        <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
          {searchList ? (
            <MarvelList marvelName={marvelName} />
          ) : (
            <Marvel marvelName={marvelName} />
          )}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
