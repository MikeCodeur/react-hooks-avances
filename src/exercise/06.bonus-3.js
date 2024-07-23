"use client"
// useContexte
// 🚀 Gérer le cache avec le contexte
// http://localhost:3000/alone/exercise/06.bonus-3.js

/* eslint-disable no-unused-vars */
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

// 🐶 Créé un context 'MarvelCacheContext' avec `React.createContext()`

// 🐶 Créé un reducer 'marvelCacheReducer' pour gérer les données en cache
// 🤖 utilise une fonction de ce style :
//
// function marvelCacheReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_MARVEL': {
//       return {...state, [action.marvelName]: action.marvelData}
//     }
//     case 'ADD_MARVEL_LIST': {
//       return {...state, [`${action.marvelName}-list`]: action.marvelData}
//     }
//     default: {
//       throw new Error(`action impossible: ${action.type}`)
//     }
//   }
// }

// 🐶 Créé un Context Provider 'MarvelCacheProvider'
function MarvelCacheProvider(props) {
  // 🐶 Utlise le 'marvelCacheReducer' avec `React.useReducer`
  // 🤖 const [cache, dispatch] = React.useReducer(marvelCacheReducer, {})
  // 🐶 Retourne le provider avec les données du reducer
  // 🤖 return <MarvelCacheContext.Provider value={[cache, dispatch]} {...props} />
}

// 🐶 Crée un Context Consumer 'useMarvelCache'
function useMarvelCache() {
  // 🐶 Utlise le contexte 'MarvelCacheContext' avec `React.useContext(MarvelCacheContext)`
  // 🤖 gère le cas ou 'useMarvelCache' n'est pas utilisé avec le provider
  // if (!context) {
  //   throw new Error('useMarvelCache doit être utilisé avec MarvelCacheProvider')
  // }
  // return context
}

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

// 🐶 Evolution de 'useFetchData' pour pourvoir mettre à jour les données avec `setData`
function useFetchData() {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })
  const {data, error, status} = state

  const execute = React.useCallback(promise => {
    dispatch({type: 'fetching'})
    promise
      .then(marvel => dispatch({type: 'done', payload: marvel}))
      .catch(error => dispatch({type: 'fail', error}))
  }, [])

  // 🐶 Dans le cas où l'on n'appelle pas d'API Rest (execute) on doit
  // pourvoir mettre à jour des données.
  // Pour cela on va retourner un callback 'setData' qui mettra à jour les data.
  // 🤖
  // const setData = React.useCallback(
  //   data => dispatch({type: 'done', payload: data}),
  //   [dispatch],
  // )

  // 🐶 pense à retouner aussi setData pour pouvoir l'utiliser dans les hooks ci-dessous
  return {data, error, status, execute}
}

// 🐶 Fais évoluer ce hook pour gérer le cache
function useFindMarvelList(marvelName) {
  // 🐶 utilise le hook 'useMarvelCache'
  // 🤖 const [cache, dispatch] = useMarvelCache()

  // 🐶 ajoute 'setData'
  const {data, error, status, execute} = useFetchData()

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    // 🐶 ajoute deux conditions :
    // 1. S'il y a des données dans : `cache[marvelName]`
    // met à jour les données directement avec `setData(cache[marvelName])`
    // 2. sinon (`cache[marvelName]` est vide )
    // Appel l'API Rest
    // `execute(fetchMarvelsList(marvelName))`
    execute(fetchMarvelsList(marvelName))
    // 🐶 N'oublie pas les nouvelles dépendances de 'useEffect'
  }, [marvelName, execute])
  return {data, error, status}
}

// 🐶 Fais évoluer ce hook pour gérer le cache
function useFindMarvelByName(marvelName) {
  const {data, error, status, execute} = useFetchData()
  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    execute(fetchMarvel(marvelName))
  }, [marvelName, execute])
  return {data, error, status}
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
      {/* 🐶 Pense à wrapper avec <MarvelCacheProvider> */}
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
