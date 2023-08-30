import { Database } from './database.types'

// const API_URL = 'express-server-production-a071.up.railway.app/api/v1/url/';
const API_URL = 'https://express-server-production-a071.up.railway.app/api/v1/url'
const API_USERNAMES = 'https://express-server-production-a071.up.railway.app/api/v1/usernames'

export type Cast = Database['public']['Tables']['casts']['Row']

export async function getCastsFromParentSource(url: string, useCache = false): Promise<Cast[]> {
  // first try to fetch from cache
  if (useCache) {
    const cached = await getCachedCasts(url)
    if (cached) return cached
  }

  const results = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .catch((error) => {
      return []
    })

  if (useCache) await cacheCasts(url, results.casts)
  return results.casts
}

export async function castsFromParentSourceCount(url: string) {
  const casts = await getCastsFromParentSource(url)
  return casts.length
}

export async function cacheCasts(url: string, casts: Cast[]) {
  return await chrome.storage.session.set({ [url]: casts })
}

export async function getCachedCasts(url: string): Promise<Cast[] | null> {
  return new Promise((resolve) => {
    chrome.storage.session.get(url, (result) => {
      resolve(result[url])
    })
  })
}

export type Username = { display: string; id: number }

export async function getUsernames(username: string): Promise<Username[]> {
  const results = await fetch(`${API_USERNAMES}/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText)
      return response.json()
    })
    .catch((error) => {
      console.error(error)
      return []
    })

  return results.usernames.slice(0, 5) as Username[]
}
