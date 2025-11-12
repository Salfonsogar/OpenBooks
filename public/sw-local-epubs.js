const epubs = new Map();

self.addEventListener('message', (ev) => {
  try {
    const data = ev.data || {};
    if (!data.type) return;
    if (data.type === 'STORE_EPUB') {
      const { id, arrayBuffer, mime } = data;
      if (id && arrayBuffer) {
        epubs.set(id, { arrayBuffer, mime: mime || 'application/epub+zip' });
        ev.source && ev.source.postMessage && ev.source.postMessage({ type: 'STORED', id });
      }
    } else if (data.type === 'UNSTORE_EPUB') {
      const { id } = data;
      if (id) epubs.delete(id);
    }
  } catch (err) {
    console.error('sw-local-epubs message handler error', err);
  }
});

self.addEventListener('fetch', (evt) => {
  const url = new URL(evt.request.url);
  if (url.pathname.startsWith('/local-epubs/')) {
    const id = url.pathname.split('/').pop();
    const entry = epubs.get(id);
    if (entry) {
      const { arrayBuffer, mime } = entry;
      const resp = new Response(arrayBuffer, { headers: { 'Content-Type': mime } });
      evt.respondWith(resp);
    }
  }
});
