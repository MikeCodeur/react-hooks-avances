"use client"
// Hook personnalisé
// 🚀 Hook avec personnage / Error
// http://localhost:3000/alone/final/02.bonus-1.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchMarvel, MarvelSearchForm, ErrorDisplay} from '../marvel'
import '../02-styles.css'

function useFindMarvelByName(marvelName) {
  const [marvel, setMarvel] = React.useState()
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    setError(null)
    setMarvel(null)
    fetchMarvel(marvelName)
      .then(marvel => setMarvel(marvel))
      .catch(error => setError(error))
  }, [marvelName])

  return [marvel, error]
}

function Marvel({marvelName}) {
  const [marvel, error] = useFindMarvelByName(marvelName)
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {marvel ? `Le marvel existe ${marvel.name}` : `Le marvel n'existe pas`}
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
