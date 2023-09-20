import * as ed from '@noble/ed25519'
import { bytesToHexString, hexStringToBytes } from '@farcaster/hub-web'
import { Buffer } from 'buffer'

type keyGeneration = {
  publicKey: Uint8Array
  privateKey: Uint8Array
}

type weirdResult = {
  token: string
  deeplinkUrl: string
}

const getPublicKeyAsync = ed.getPublicKeyAsync

const generateKeyPair = async (): Promise<keyGeneration> => {
  const privateKey = ed.utils.randomPrivateKey()
  const publicKey = await ed.getPublicKeyAsync(privateKey)
  return { publicKey, privateKey }
}

const createSignature = async (publicKeyBytes: Uint8Array): Promise<string> => {
  const publicKey = `0x${Buffer.from(publicKeyBytes).toString('hex')}`
  console.log(publicKey)
  const response = await fetch(
    'https://express-server-production-a071.up.railway.app/api/v1/createSignature',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicKey }),
    },
  )
  const { signature } = await response.json()
  return signature
}

// extract key from keygen
const sendPublicKey = async (publicKey: Uint8Array, signature: string): Promise<weirdResult> => {
  const convertedKey = bytesToHexString(publicKey)._unsafeUnwrap()

  const fid = 20187
  const deadline = Math.floor(Date.now() / 1000) + 86400 // signature is valid for 1 day
  const body = {
    key: convertedKey,
    requestFid: fid,
    deadline,
    signature,
  }
  console.log(body)

  const response = await fetch('https://api.warpcast.com/v2/signed-key-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const result = (await response.json()).result

  const { deeplinkUrl, token }: weirdResult = result.signedKeyRequest

  return { deeplinkUrl, token }
}

const requestSignerAuthStatus = async (token: string) => {
  return await (
    await fetch(`https://api.warpcast.com/v2/signed-key-request?token=${token}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json()
}

export {
  generateKeyPair,
  createSignature,
  sendPublicKey,
  requestSignerAuthStatus,
  getPublicKeyAsync,
  bytesToHexString,
  hexStringToBytes,
}
