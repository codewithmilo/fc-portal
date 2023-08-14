// respond to new pages loading, msgs coming from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const logo = request.hasThread ? 'img/logo-badge-16.png' : 'img/logo-48.png'
  chrome.action.setIcon({ path: logo })
  sendResponse({ message: request.hasThread ? 'badged' : 'unbadged' })
})

// respond to the tab changing, tell the content script to redo itself
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, async (tab) => {
    if (!tab.id) return
    const response = await chrome.tabs.sendMessage(tab.id, { run: true })
  })
})

export {}
