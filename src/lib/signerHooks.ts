import { useEffect, useState } from 'react'
import { generateKeyPair, requestSignerAuthStatus, createSignature, sendPublicKey } from './signer'
import { NobleEd25519Signer } from '@farcaster/hub-web'

type Token = {
  token: string
  deepLink: string
}

type Keypair = {
  privateKey: Uint8Array
  publicKey: Uint8Array
}

type SignerData = {
  token: string
  deeplinkUrl: string
  key: string
  state: 'pending' | 'completed' | 'approved'
  userFid: number
}

type Signer = {
  signedKeyRequest: SignerData
  isConnected: boolean
}

const useToken = (clientName: string) => {
  const [fetchedToken, setFetchedToken] = useState<Token>({
    token: '',
    deepLink: '',
  })

  useEffect(() => {
    ;(async () => {
      if (localStorage.getItem('farsign-signer-' + clientName) != null) {
        setFetchedToken({
          token: 'already connected',
          deepLink: 'already connected',
        })
      } else {
        const { publicKey, privateKey } = await generateKeyPair()
        const signature = await createSignature(publicKey)
        const { token, deeplinkUrl } = await sendPublicKey(publicKey, signature)

        localStorage.setItem('farsign-privateKey-' + clientName, privateKey.toString())

        setFetchedToken({ token: token, deepLink: deeplinkUrl })
      }
    })()
  }, [])

  return [fetchedToken, setFetchedToken] as const
}

const useSigner = (clientName: string, token: Token) => {
  const [signer, setSigner] = useState<Signer>({
    signedKeyRequest: {
      token: '',
      deeplinkUrl: '',
      key: '',
      state: 'pending',
      userFid: 0,
    },
    isConnected: false,
  })

  useEffect(() => {
    if (localStorage.getItem('farsign-signer-' + clientName) === null) {
      ;(async () => {
        if (token.token.length > 0) {
          while (true) {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            const data = await requestSignerAuthStatus(token.token)
            console.log('data', data)

            if (
              data.result &&
              data.result.signedKeyRequest &&
              data.result.signedKeyRequest.state === 'completed'
            ) {
              localStorage.setItem('farsign-signer-' + clientName, JSON.stringify(data.result))

              setSigner({
                signedKeyRequest: data.result.signedKeyRequest,
                isConnected: true,
              })
              break
            }
          }
        }
      })()
    } else {
      setSigner(JSON.parse(localStorage.getItem('farsign-signer-' + clientName)!) as Signer)
    }
  }, [token])

  return [signer, setSigner] as const
}

const useCheckSigner = (clientName: string) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (localStorage.getItem('farsign-signer-' + clientName) === null) setIsConnected(false)
      else setIsConnected(true)
    })()
  }, [])

  return [isConnected, setIsConnected] as const
}

const useEncryptedSigner = (clientName: string, token: Token) => {
  const [encryptedSigner, setEncryptedSigner] = useState<NobleEd25519Signer>()

  useEffect(() => {
    if (token.token.length > 0) {
      const privateKey = localStorage.getItem('farsign-privateKey-' + clientName)!

      const privateKey_encoded = Uint8Array.from(
        privateKey.split(',').map((split) => Number(split)),
      )
      setEncryptedSigner(new NobleEd25519Signer(privateKey_encoded))
    }
  }, [token])

  return [encryptedSigner, setEncryptedSigner] as const
}

export { useSigner, useToken, useCheckSigner, useEncryptedSigner }
export type { Token, Signer, SignerData, Keypair }
