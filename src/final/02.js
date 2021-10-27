// Hook personnalisé
// http://localhost:3000/alone/final/02.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchMarvel, MarvelSearchForm, ErrorDisplay} from '../marvel'
import '../02-styles.css'

function useMarvelExist(marvelName) {
  const [exist, setExist] = React.useState(false)

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    setExist(false)
    fetchMarvel(marvelName)
      .then(() => setExist(true))
      .catch(() => setExist(false))
  }, [marvelName])

  return exist
}

function Marvel({marvelName}) {
  const marvelExist = useMarvelExist(marvelName)
  return (
    <div> {marvelExist ? `Le marvel existe` : `Le marvel n'existe pas`}</div>
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
