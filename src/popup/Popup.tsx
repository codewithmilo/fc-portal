import { useCheckSigner } from '@farsign/hooks'
import SignIn, { CLIENT_NAME, PRIVATE_KEY, STORAGE_KEY } from '../components/SignIn'
import './Popup.css'
import { useEffect, useState } from 'react'
import CastForm from '../components/CastForm'
import CastThread from '../components/CastThread'

function App() {
  const [isConnected, setIsConnected] = useCheckSigner(CLIENT_NAME)
  const [url, setUrl] = useState('')
  const [urlHasThread, setUrlHasThread] = useState(false)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      if (!url) return

      setUrl(url)
      chrome.storage.local.get(url, (result) => {
        setUrlHasThread(!!result[url])
      })
    })
  }, [isConnected])

  const signout = () => {
    localStorage.clear()
    chrome.storage.local.clear()
    window.location.reload()
  }

  return (
    <div className="body">
      <img src="img/logo-zoomed.png" alt="Farcaster Portal logo" width={64} />
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
          {urlHasThread ? (
            <div className="threads">
              <CastThread url={url} />
              <br />
              <CastForm url={url} />
            </div>
          ) : (
            <CastForm url={url} />
          )}
          <p className="signout" onClick={signout}>
            Sign out
          </p>
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
}

export default App
