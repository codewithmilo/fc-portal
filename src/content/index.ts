import { castsFromParentSourceExist } from '../lib/database'

let hasThread

const getAndStoreUrlThreadStatus = async () => {
  const url = window.location.href
  hasThread = await castsFromParentSourceExist(url)

  // store in browser so popup doesn't need to make another request
  chrome.storage.local.set({ [url]: hasThread })

  // then tell background to update the icon based on thread status
  await chrome.runtime.sendMessage({ hasThread })
}

getAndStoreUrlThreadStatus()

// respond to a tab being navigated to
chrome.runtime.onMessage.addListener((request) => {
  if (request.run) getAndStoreUrlThreadStatus()
})
