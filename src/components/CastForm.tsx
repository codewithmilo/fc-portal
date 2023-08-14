import { useState } from 'react'
import './CastForm.css'
import { SignerData, useEncryptedSigner, useToken } from '@farsign/hooks'
import { CLIENT_NAME, STORAGE_KEY } from './SignIn'
import {
  CastAddBody,
  FarcasterNetwork,
  NobleEd25519Signer,
  getHubRpcClient,
  makeCastAdd,
} from '@farcaster/hub-web'

export default function CastForm({ url }: { url: string }) {
  const [token, _setToken] = useToken(CLIENT_NAME)
  const [encryptedSigner, _setEncryptedSigner] = useEncryptedSigner(CLIENT_NAME, token)

  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError('')
    setSuccess(false)
    // TODO send cast
    const request: SignerData = JSON.parse(localStorage.getItem(STORAGE_KEY)!).signerRequest
    const client = getHubRpcClient('https://5548ae.hubs.neynar.com:2283', {}) // awesome hub

    // remove query params
    const castAdd = await makeCastAdd(
      CastAddBody.create({
        text,
        parentUrl: url,
      }),
      { fid: request.fid, network: FarcasterNetwork.MAINNET },
      encryptedSigner as NobleEd25519Signer,
    )

    client
      .submitMessage(castAdd.unwrapOr({}))
      .then((res) => {
        setIsSubmitting(false)
        setSuccess(true)
      })
      .catch((err) => {
        setIsSubmitting(false)
        setError(err.message)
      })
  }

  return (
    <div className="cast-form">
      <h3>Start a new thread</h3>
      <textarea
        autoCorrect="on"
        cols={45}
        maxLength={320}
        minLength={1}
        name="text"
        required
        rows={7}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Cast
      </button>
      <p>
        {error ? error : null}
        {isSubmitting ? 'Submitting...' : null}
        {success ? 'Success!' : null}
      </p>
    </div>
  )
}
