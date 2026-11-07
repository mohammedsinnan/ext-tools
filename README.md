# CREST

CREST is a browser userscript for 3rb.io. It adds a redesigned game interface, configurable cell and camera motion, and graphics options for players who need a lighter client. This is my first published software project. I started with an existing client shared by a friend and developed CREST around that working base.

**Explore the project** · [Preferences Studio](https://mohammedsinnan.github.io/ext-tools/crest-settings-preview.html) · [Movement Studio](https://mohammedsinnan.github.io/ext-tools/crest-movement-preview.html) · [Graphics profiles](https://mohammedsinnan.github.io/ext-tools/crest-performance-preview.html)

These standalone previews demonstrate the interface and controls in a browser without a game account or userscript installation.

## What I built

| Area | Work |
| --- | --- |
| Interface | Redesigned the menu, settings, leaderboard, chat, and minimap. Added a Customize panel for arenas, movement profiles, skins, and emotes. |
| Rendering | Added Slipstream, a movement profile that uses elapsed time to smooth cell position and size, along with camera easing. The renderer draws from server updates while game rules stay on the server. |
| Performance | Added graphics profiles and an Auto mode that responds to measured frame timing. A lower-resolution canvas can reduce drawing work while keeping the same logical coordinates for mouse input and the camera. |
| Reliability | Reworked startup so the page exists before scripts initialize. Downloads use timeouts and bounded retries, and startup failures show a retry screen. |
| Team play | Maintained the inherited multibox flow and improved the display and diagnostics for team tags and Commander markers. |

## Engineering notes

**Startup race.** An earlier loader could leave a blank screen because resources finished loading in different orders. The current loader downloads resources in parallel, checks their responses, builds the document, and then initializes the library, compatibility layer, and client in order. See [the loader](./crest.user.js) and [the startup fix](https://github.com/mohammedsinnan/ext-tools/commit/4cbe5562db504b6c665d91ffd87c1d3b88fa1add).

**Rendering and diagnostics.** Graphics reports track rendered FPS and average drawing time. Connection reports record a short history of connection stages, WebSocket close codes, packet opcodes, and sizes. The packet trace omits packet bodies, and account-token status is summarized as presence and age. That separation helps distinguish a slow frame from a connection failure. See [the diagnostics and graphics code](./m.js#L3192) and [the movement presets](./m.js#L3777).

## Security and trust

The [Tampermonkey loader](./crest.user.js) runs on 3rb.io and its subdomains and uses `GM_xmlhttpRequest` to fetch the client from this repository’s GitHub Pages deployment. It executes the downloaded JavaScript, so an installed userscript trusts future deployments from the repository. The startup checks catch incomplete responses. The loader currently has no pinned hashes or signature verification for downloaded code.

## Verification

- JavaScript syntax checks passed for the loader and game client.
- A local Chrome smoke test with mocked network responses reached the game menu and confirmed that Slipstream stayed selected after refresh.
- Deterministic motion checks at 30, 60, and 144 FPS covered split settling, camera response, and the existing presets. Live server behavior depends on 3rb.io and the team relay.

## Repository guide

| File | Role |
| --- | --- |
| [`crest.user.js`](./crest.user.js) | Tampermonkey entry point and startup loader |
| [`index.html`](./index.html) | Game canvas, menus, settings markup, and styles |
| [`m.js`](./m.js) | Browser client, input handling, rendering, preferences, and connection diagnostics |
| [`v.js`](./v.js) and [`shield.js`](./shield.js) | Supporting scripts loaded by the client |

CREST is an independent project and is unaffiliated with 3rb.io.
