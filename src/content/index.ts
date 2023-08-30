import { castsFromParentSourceCount } from '../lib/database'

let castCount

const getAndStoreUrlThreadStatus = async () => {
  const url = window.location.href
  castCount = await castsFromParentSourceCount(url)

  // store in browser so popup doesn't need to make another request
  chrome.storage.local.set({ [url]: castCount })

  // then tell background to update the icon based on thread status
  await chrome.runtime.sendMessage({ castCount })
}

getAndStoreUrlThreadStatus()

// respond to a tab being navigated to
chrome.runtime.onMessage.addListener((request) => {
  if (request.run) getAndStoreUrlThreadStatus()
})
