// Hook Perso
// http://localhost:3000/alone/exercise/02.js

/* eslint-disable no-unused-vars */
import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchMarvel, MarvelPersoView, MarvelSearchForm, ErrorDisplay} from '../marvel'
import '../02-styles.css'

// 🐶 créé un hook personnalisé 'useMarvelExist' qui va appeler l'api. 
// Ce hook retournera le state 'exist' à true s'api retourne un marvel
// Il retournera  à false si fetchMarvel lève une erreur 
function useMarvelExist(marvelName) {
  // 🐶 créé un state 'exist'
  const [exist, setExist] = React.useState(false)

  React.useEffect(() => {
    if (!marvelName) {
      return
    }
    // 🐶 gère l'appelle de l'api 
    // fetchMarvel(marvelName)
    //   .then(() => /* met le state exist à true */)
    //   .catch(() => /* met le state exist à false */)

    // 🐶 n'oublie pas les dependances et désactive le warning ESLint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return exist
}

function Marvel({marvelName}) {
  
  // ⛏️ remplace false par le hook personnalisé
  // 🤖 `useMarvelExist(marvelName)`
  const marvelExist = false;
  return (
    <div> {marvelExist ? `Le marvel existe` : `Le marvel n'existe pas`}</div>
  )
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
