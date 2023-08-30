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
import { getUsernames } from '../lib/database'
import { MentionsInput, Mention, MentionItem } from 'react-mentions'

export default function CastForm({ url }: { url: string }) {
  const [token, _setToken] = useToken(CLIENT_NAME)
  const [encryptedSigner, _setEncryptedSigner] = useEncryptedSigner(CLIENT_NAME, token)

  const [text, setText] = useState('')
  const [mentions, setMentions] = useState<MentionItem[]>([])
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [plainText, setPlainText] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = async () => {
    if (!plainText) {
      setError('Please say something!')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    const request: SignerData = JSON.parse(localStorage.getItem(STORAGE_KEY)!).signerRequest
    const client = getHubRpcClient('https://5548ae.hubs.neynar.com:2283', {})

    const fidMentions = mentions.map((m: MentionItem) => parseInt(m.id))
    const mentionsPositions = mentions.map((m: MentionItem) => m.plainTextIndex)
    const cleanedText = plainText.replaceAll(/\s@\S+/g, ' ')

    const castAdd = await makeCastAdd(
      CastAddBody.create({
        text: cleanedText,
        parentUrl: url,
        mentions: fidMentions,
        mentionsPositions,
      }),
      { fid: request.fid, network: FarcasterNetwork.MAINNET },
      encryptedSigner as NobleEd25519Signer,
    )

    client
      .submitMessage(castAdd.unwrapOr({}))
      .then((res) => {
        setIsSubmitting(false)
        setSuccess(true)
        setResult(JSON.stringify(res))
        // TODO update casts cache
      })
      .catch((err) => {
        setIsSubmitting(false)
        setError(err.message)
      })
  }

  const fetchUsernames = async (query: string, callback: any) => {
    if (!query) return
    getUsernames(query).then(callback)
  }

  return (
    <div className="cast-form">
      <MentionsInput
        autoFocus
        placeholder="Thoughts?"
        value={text}
        onChange={(e, val, plainVal, mentions) => {
          setMentions(mentions)
          setText(val)
          setPlainText(plainVal)
        }}
        className="input"
      >
        <Mention
          trigger="@"
          data={fetchUsernames}
          displayTransform={(id, display) => `@${display}`}
          appendSpaceOnAdd={true}
        />
      </MentionsInput>
      <button type="submit" onClick={handleSubmit}>
        Cast
      </button>
      <p>
        {error ? error : null}
        {isSubmitting ? 'Submitting...' : null}
        {success ? 'Success!' : null}
        {result ? result : null}
      </p>
    </div>
  )
}
