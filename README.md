# Farcaster Portal

> A chrome extension that shows any casts with the current page URL as the parent, and lets you cast to it as well

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

## TODO

- update URL's cast immediately after sending
- mentions in text input
  - @mention of users should work
- full threads (collapsible)
  - show all replies to casts, not just the top level with a reply count
- inline reply option
  - allow replying to any cast, not just a top level cast
- etherscan URLs convert to chain links
  - (from kmacb.eth) etherscan links change from https to chain://...
