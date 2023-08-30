import { useToken, useSigner } from '@farsign/hooks'
import { useEffect } from 'react'
import QRCode from 'react-qr-code'

export const CLIENT_NAME = 'Farcaster Portal'
export const STORAGE_KEY = 'farsign-signer-' + CLIENT_NAME
export const PRIVATE_KEY = 'farsign-privateKey-' + CLIENT_NAME

function SignIn({ set }: { set: any }) {
  const [token, _setToken] = useToken(CLIENT_NAME)
  const [signer, _setSigner] = useSigner(CLIENT_NAME, token)

  useEffect(() => {
    if (signer.isConnected) {
      set(true)
    }
  }, [signer])

  return signer.isConnected === false ? (
    <QRCode style={{ margin: '0 auto' }} value={token.deepLink} size={168} />
  ) : null
}

export default SignIn
