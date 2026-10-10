# 3RB NEXT — native client redesign

This redesign edits the old client's own HTML and Canvas 2D renderer. It replaces the narrow old menu with a responsive three-column interface for profiles, server/party controls and account login. It does not run the earlier NEXT overlay extension.

## Install the ready build

1. Disable the previous NEXT Chrome extension and old Drag+ userscripts so only one client runs.
2. In Tampermonkey Dashboard > Utilities > Import from file, select `dist/3rb-next-client.user.js` (or import the delivered `3rb-next-client.user.js`). Enable it.
3. Refresh https://3rb.io/. Use the same login flow as your working old client. If your normal sequence is sign out, refresh, sign in, keep using that sequence.
4. Select your server and Enter arena. The existing two-player engine owns both connections and the original Tab binding.
5. Appearance opens the full native theme panel. Choose an arena palette or Glass/Flat cell material. Menu theme, opacity and animation controls are in the right-hand menu card. Gameplay and Controls open the original full panels.

To restore the previous client, disable this userscript and re-enable your old script. The new build uses the existing profile/settings storage plus a separate `MX-nextInterface` preference record; it does not clear account data.

## Changes

- New native layout, typography, responsive cards, focus states and short interface transitions.
- Both names, skin links, tag, party controls, native provider anchors and logout remain the actual original controls.
- Midnight, Frost and Ember arena palettes apply through the existing Theme save methods; controls and animation delay are preserved.
- Cached 128px glass shading is drawn inside the existing cell pass. No second visible canvas or independent render loop. Skinned cells, viruses, ejecta, player rings and geometry retain the original rendering behavior. Flat removes the additional draw calls.
- The userscript bundles pinned copies of the existing client instead of fetching executable files from a different repository. Bootstrap starts vendor, shield and client once after DOM readiness.

## Base and evidence

GitHub base: mohammedsinnan/ext-tools, commit 8255310f60459e7a7d75ce3e32363c6821e9f664. The engine/vendor/shield files match the recorded client's current thedarkness042/3rbup source at 6adce3f878ffe889c24c5ca713607d0bb2d2e7c7; the old loader targets and HTML differ. `baseline.json` pins SHA-256 values for the original networking, account, physics, input, interpolation and camera classes, plus vendor and shield files. Those checks prevent the presentation changes from silently altering the working engine. Existing engine/security behavior was inherited, not redesigned or audited in this task.

## Verification and remaining limits

JavaScript syntax checks and seven automated tests pass: protected engine class/file hashes, unique native controls and unchanged provider anchors, preference persistence/native handlers/status, material drawing/state, skin/virus/ejecta/flat exclusion, bundled source structure and ordered one-time bootstrap. These are source and mocked checks, not a claim that live Google/Discord or two-player gameplay has passed.

Live Chrome visual review and login/gameplay remain unverified. The local browser preview could not be opened in the agent's environment. A separate design preview is supplied for inspection; it does not connect to the game. FPS has not been benchmarked, so no performance improvement is claimed.

## Develop

Node 20+: install dev dependencies with npm install or pnpm install. Run `npm run build` and `npm test` (or corresponding pnpm commands). Build embeds next-ui.css/next-ui.js into index.html and regenerates dist/3rb-next-client.user.js plus script.txt. Editing m.js should keep baseline-protected classes unchanged for presentation work.

Branch: next-client-redesign. Main was not overwritten.
