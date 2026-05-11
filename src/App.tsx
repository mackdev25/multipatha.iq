import { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import Documentation from './pages/documentation/Documentation';

function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (hash === '#/docs') {
    return <Documentation />;
  }

  return <AppLayout />;
}

export default App;
