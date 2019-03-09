# electron-5x-http-crash
Electron 5.x bug-report; App crashes (127) on http requests after few seconds.

Since Electron 5 (beta), some API end-points that return JSON data will crash the app when the connection is closed (after a few seconds).

At first I thought it was a problem with [got](https://npmjs.com/package/got/), but once I tried other HTTP-clients like Axio, SuperAgent
I figured I'd test this with the native `https` library that comes with Node.

## Installation

- Clone this repo
- `npm install` or `yarn install`
- `yarn start` or `node_modules/.bin/electron .`

Sit back and wait for a few seconds.

Downgrading Electron to the latest stable 4.x release (4.0.8 at time of writing) will leave the app running as expected.
