import { useState, useEffect } from 'react';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Auth from './pages/auth/Auth';
import Home from './pages/home/Home';

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);
  console.log('is the user logged =>', isLogged);

  return (
    <div className="App">
      {isLogged ? <Home deleteCookie={deleteCookie} setIsLogged={setIsLogged} /> : <Auth setIsLogged={setIsLogged} />}
    </div>
  );
}

export default App;
