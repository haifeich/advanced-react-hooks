// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)
  // 🐨 call React.useDebugValue here.
  // 💰 here's the formatted label I use: c
  React.useDebugValue(`\`${query}\` => ${state}`)
  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}
const matchDark = '(prefers-color-scheme:dark)'
function useDarkMode() {
  const [isDark, setIsDark] = React.useState(
    () => window.matchMedia && window.matchMedia(matchDark).matches,
  )
  React.useEffect(() => {
    const matcher = window.matchMedia(matchDark)
    const onChange = ({matches}) => setIsDark(matches)
    matcher.addEventListener(onChange)
    return () => {
      matcher.removeEventListener(onChange)
    }
  }, [setIsDark])
  return isDark
}

function App() {
  return <Box />
}

export default App
