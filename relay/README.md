# CREST tag relay

This service replaces the third-party team-tag relay. It does not host 3rb.io matches, handle login, or connect upstream. It keeps temporary teammate names, positions, colors and cosmetic metadata in memory. Restarting it drops the roster until clients reconnect.

## Local test

1. Install Node.js 22 or later, then run `npm ci` and `npm test` in this folder.
2. Optionally set `CREST_CLIENT_FILE` to the current CREST `m.js` path before running tests to include the actual client packet encoder and decoder.
3. For manual testing set `CREST_ROOMS=T_LOCALCHECK` and run `npm start`. It listens on loopback port 8080 by default. GET `/healthz` returns `{"ok":true}`. The tests exercise it over loopback. The live extension on HTTPS needs trusted WSS.

## Hosting

Use a server you control and a DNS hostname pointed at it. The following runs the relay behind a TLS reverse proxy on that server; port 8080 stays private. Replace the example room with a long random shared team tag. This example is for a Linux host with Docker and Caddy already installed.

```sh
docker build -t crest-tag-relay .
docker run -d --name crest-tag-relay --restart unless-stopped \
  -p 127.0.0.1:8080:8080 \
  -e CREST_ROOMS=T_REPLACE_WITH_YOUR_LONG_RANDOM_TAG \
  crest-tag-relay
```

Set `CREST_DOMAIN` in the proxy environment, or replace `{$CREST_DOMAIN}` in the example Caddyfile with your actual hostname. Apply the proxy configuration and allow inbound HTTPS (and HTTP for certificate issuance/redirect, if used). Verify the hostname's trusted HTTPS certificate, `/healthz`, and a real WSS upgrade before changing the live client. The relay expects `wss://YOUR_HOST/?room=T_YOUR_TAG` from 3rb.io. The client still needs to be pointed at that verified hostname and tested by two players on the same 3rb.io server.

## Scope and access

- `CREST_ROOMS` is required. It lists complete room identifiers, e.g. `T_MYRANDOMTAG`; CREST uppercases tags and strips characters other than A–Z, digits, underscores, and hyphens. Unlisted rooms are rejected. This deployment is intended for explicitly configured tag rooms. To use an existing native party instead, use 3rb.io's Party feature.
- Use a long unpredictable tag and share it only with teammates. Origin checks limit browser use but are not user authentication; clients that know a room name can join it. This relay does not authorize or verify players with 3rb.io.
- Game-server scoping uses current CREST's `MO1` metadata, which omits URL query parameters. Older clients that do not send that metadata won't appear. The relay only sends teammate positions within a configured room and reported game server.
- Frame, connection, room-size and idle limits are enforced. There is no database or account data. Use trusted HTTPS/WSS; leave certificate verification enabled.
