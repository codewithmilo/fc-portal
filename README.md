# Farcaster Portal

> A chrome extension that shows any casts with the current page URL as the parent, and lets you cast to it as well

## Installing

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

## Development

1. Run `npm run dev`
2. Go to chrome://extensions
3. Toggle on "Developer mode"
4. Click 'Load unpacked', and select the `/build` folder

This will auto-update the extension on any code changes!

## TODO

- update URL's cast immediately after sending (currently takes up to 1 minute)
- allow user setting of which web client to use for replies
  - instead of building an entire read/write client in the extension, fall back on the multitude of existing clients
