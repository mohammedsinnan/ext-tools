// ==UserScript==
// @name         CREST Relay
// @namespace    https://mohammedsinnan.github.io/ext-tools/
// @version      1.0.0
// @description  Team Tag and Commander connection for CREST.
// @match        https://3rb.io/*
// @match        https://*.3rb.io/*
// @run-at       document-start
// @sandbox      DOM
// @grant        GM_info
// @noframes
// @downloadURL  https://mohammedsinnan.github.io/ext-tools/crest-relay.user.js
// @updateURL    https://mohammedsinnan.github.io/ext-tools/crest-relay.user.js
// ==/UserScript==
(() => {
  'use strict';
  const endpoint = 'wss://crest-tag-relay.onrender.com/';
  const channels = 'meta[data-crest-relay-room]';
  let root, active;
  const rootObserver = new MutationObserver(sync);

  function sync() {
    if (root !== document.documentElement) {
      rootObserver.disconnect();
      root = document.documentElement;
      if (root) {
        root.setAttribute('data-crest-relay-bridge', '1');
        rootObserver.observe(root, { childList: true });
      }
    }
    const channel = root?.querySelector(':scope > ' + channels);
    if (active?.channel === channel) return;
    if (active) {
      active.close();
      active = null;
    }
    if (channel) open(channel);
  }

  function open(channel) {
    const room = channel.getAttribute('data-crest-relay-room');
    const emit = (name, detail = '') =>
      channel.dispatchEvent(new CustomEvent('crest-relay-' + name, { detail }));
    const url = new URL(endpoint);
    if (!/^[A-Z0-9_-]{1,64}$/.test(room)) {
      emit('error');
      emit('close');
      return;
    }
    url.searchParams.set('room', room);
    let ws;
    try {
      ws = new WebSocket(url);
    } catch {
      emit('error');
      emit('close');
      return;
    }
    ws.binaryType = 'arraybuffer';
    const send = event => {
      const value = event.detail;
      if (ws.readyState !== WebSocket.OPEN || ws.bufferedAmount > 262144 ||
          typeof value !== 'string' || value.length > 2732) return;
      try {
        const bytes = Uint8Array.from(atob(value), character => character.charCodeAt(0));
        if (bytes.length && bytes.length <= 2048) ws.send(bytes);
      } catch {
        // Ignore invalid relay frames.
      }
    };
    channel.addEventListener('crest-relay-send', send);
    active = {
      channel,
      close() {
        channel.removeEventListener('crest-relay-send', send);
        ws.close();
      }
    };
    ws.onopen = () => emit('open');
    ws.onerror = () => emit('error');
    ws.onclose = () => emit('close');
    ws.onmessage = event => {
      const bytes = new Uint8Array(event.data);
      if (bytes.length > 131072) return;
      let binary = '';
      for (const byte of bytes) binary += String.fromCharCode(byte);
      emit('message', btoa(binary));
    };
  }

  // CREST replaces the document. Observe its root so the bridge survives that rewrite.
  new MutationObserver(sync).observe(document, { childList: true });
  sync();
})();
