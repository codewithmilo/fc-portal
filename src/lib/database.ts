import { Database } from './database.types'

// const API_URL = 'express-server-production-a071.up.railway.app/api/v1/url/';
const API_URL = 'https://express-server-production-a071.up.railway.app/api/v1/url'

export type Cast = Database['public']['Tables']['casts']['Row']

export async function getCastsFromParentSource(url: string): Promise<Cast[]> {
  const results = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
      return []
    })
  console.log(results.ip)
  return results.casts
}

export async function castsFromParentSourceExist(url: string) {
  const casts = await getCastsFromParentSource(url)
  return casts.length > 0
}
