import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

async function deferRender() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
