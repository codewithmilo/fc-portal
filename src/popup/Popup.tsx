import { useCheckSigner } from '@farsign/hooks'
import SignIn, { CLIENT_NAME } from '../components/SignIn'
import { useEffect, useState } from 'react'
import CastForm from '../components/CastForm'
import CastThread from '../components/CastThread'
import './Popup.css'
import { Cast, getCastsFromParentSource } from '../lib/database'

function App() {
  const [isConnected, setIsConnected] = useCheckSigner(CLIENT_NAME)
  const [url, setUrl] = useState('')
  const [casts, setCasts] = useState<Cast[]>([])
  const [loaded, setLoaded] = useState(false)
  const [selection, setSelection] = useState(0)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      if (!url) return

      setUrl(url)
      chrome.storage.local.get(url, async (result) => {
        if (result[url]) {
          let casts: Cast[] = await getCastsFromParentSource(url, true)
          if (casts.length !== result[url]) {
            casts = await getCastsFromParentSource(url, false)
          }
          setCasts(casts)
        }
        setLoaded(true)
      })
    })
  }, [isConnected])

  const signout = () => {
    localStorage.clear()
    chrome.storage.local.clear()
    window.location.reload()
  }

  const Tabs = () => (
    <div className="sections">
      <h2 className={selection === 0 ? 'selected' : ''} onClick={() => setSelection(0)}>
        Casts
      </h2>
      <h2 className={selection === 1 ? 'selected' : ''} onClick={() => setSelection(1)}>
        Send cast
      </h2>
    </div>
  )

  const View = ({ loaded, selection }: { loaded: boolean; selection: number }) => (
    <>
      {selection === 0 && <CastThread url={url} casts={casts} />}
      {selection === 1 && <CastForm url={url} />}
    </>
  )

  if (!loaded) {
    return <div className="body"></div>
  }

  return (
    <div className="body">
      <img src="img/logo-zoomed.png" alt="Farcaster Portal logo" width={64} className="logo" />
      <h1>Farcaster Portal</h1>
      {isConnected === false ? (
        <>
          <SignIn set={setIsConnected} />
          <p className="signin">
            Scan the above with your phone to sign in to your Farcaster account
          </p>
        </>
      ) : (
        <>
          <div className="url">{stripUrlFluff(url)}</div>
          <Tabs />
          <View loaded={loaded} selection={selection} />
          <div className="signout">
            <p onClick={signout}>Sign out</p>
          </div>
        </>
      )}
    </div>
  )
}

const stripUrlFluff = (url: string) => {
  return url
    .replace(/(http|https):\/\//, '')
    .replace(/(#\S+)/, '')
    .replace(/(\?\S+)/, '')
    .replace(/\/$/, '')
}

export default App
