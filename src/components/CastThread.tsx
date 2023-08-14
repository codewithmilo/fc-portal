import { useEffect, useState } from 'react'
import { Cast, getCastsFromParentSource } from '../lib/database'
import './CastThread.css'

export default function CastThread({ url }: { url: string }) {
  const [casts, setCasts] = useState<Cast[]>([])

  useEffect(() => {
    ;(async function getCasts() {
      const casts: Cast[] = await getCastsFromParentSource(url)
      setCasts(casts)
    })()
  }, [])

  const open = (username: string, hash: string) => {
    const url = getWcUrl(username, hash)
    chrome.tabs.create({ url })
  }

  return (
    <>
      <h3>Threads</h3>
      <div className="casts">
        {casts.map((cast) => (
          <div className="cast">
            <div className="header">
              <img
                className="avatar"
                src={cast.author_pfp_url as string}
                alt="avatar"
                width={48}
                height={48}
              />
              <div className="metadata">
                <p className="author">{cast.author_display_name}</p>
                <p className="timestamp">{formatDate(cast.published_at)}</p>
              </div>
              <div className="spacer"></div>
              <div className="info">
                <div>❤ {cast.reactions_count}</div>
                <div>↻ {cast.recasts_count}</div>
                <div>↧ {cast.replies_count}</div>
              </div>
            </div>
            <div className="text">{cast.text}</div>
            <div className="footer">
              <a href="" onClick={() => open(cast.author_username as string, cast.hash)}>
                Open in Warpcast
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const getWcUrl = (username: string, hash: string) => {
  return `https://warpcast.com/${username}/${hash.slice(0, 8)}`
}

const formatDate = (date: string) => {
  const now = new Date()
  const d = new Date(date)
  const diffMinutes = (now.getTime() - d.getTime()) / 1000 / 60
  let unit = 'minute'
  let diff = diffMinutes
  if (diffMinutes > 60) {
    unit = 'hour'
    diff = diffMinutes / 60
  }
  if (diffMinutes > 60 * 12) {
    unit = 'day'
    diff = diffMinutes / 60 / 24
  }
  if (diffMinutes > 60 * 24 * 30) {
    unit = 'month'
    diff = diffMinutes / 60 / 24 / 30
  }

  const rtf = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
    style: 'short',
  })

  return rtf.format(Math.round(diff) * -1, unit as Intl.RelativeTimeFormatUnit)
}
