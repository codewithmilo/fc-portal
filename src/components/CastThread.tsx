import { useEffect, useState } from 'react'
import { Cast, getCastsFromParentSource } from '../lib/database'
import './CastThread.css'
import { Client } from './Menu'

export default function CastThread({ url, casts }: { url: string; casts: Cast[] }) {
  const open = (username: string, hash: string) => {
    const url = getClientUrl(username, hash)
    chrome.tabs.create({ url })
  }

  if (casts.length === 0) {
    return (
      <div className="empty">
        <h3>No casts yet</h3>
      </div>
    )
  }

  return (
    <div className="casts">
      {/* show max 20 for now, shouldn't be more than this ever really */}
      {casts.slice(0, 20).map((cast, i) => (
        <div
          key={i}
          className="cast"
          onClick={() => open(cast.author_username as string, cast.hash)}
        >
          <div className="header">
            <img
              className="avatar"
              src={cast.author_pfp_url as string}
              alt="avatar"
              width={28}
              height={28}
            />
            <div className="metadata">
              <span className="author">{cast.author_display_name}</span>
            </div>
            <div className="spacer"></div>
            <div className="info">
              <span className="timestamp">{formatDate(cast.published_at)}</span>
            </div>
          </div>
          <div className="text">{cast.text}</div>
          <div className="footer">
            <span className="replies">{repliesString(cast.replies_count as number)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const getClientUrl = (username: string, hash: string) => {
  const client = (localStorage.getItem('client') || Client.WARPCAST) as Client

  switch (client) {
    case Client.WARPCAST:
      return `https://warpcast.com/${username}/${hash.slice(0, 8)}`
    case Client.DISCOVE:
      return `https://discove.xyz/threads/${hash}/${hash}`
    case Client.PHRASETOWN:
      return `https://phrasetown.com/app/cast/${hash}`
    case Client.JAM:
      return `https://jam.so/cast/${hash}`
  }
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

const repliesString = (count: number) => {
  if (count === 0) return ''
  if (count === 1) return '↧ 1 reply'
  return `↧ ${count} replies`
}
