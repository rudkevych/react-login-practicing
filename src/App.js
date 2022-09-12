import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const isLogged = localStorage.getItem('isLoggedIn');

    if (isLogged) {
      setIsLogged(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', 1);
    setIsLogged(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={
      {
        isLoggedIn: isLogged,
        onLogout: logoutHandler
      }
    }>
      <MainHeader />
      <main>
        {!isLogged && <Login onLogin={loginHandler} />}
        {isLogged && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
