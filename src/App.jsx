import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import Ashshohwah from './pages/Ashshohwah';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('loggedInUser');
      setIsLoggedIn(!!user);
    };

    window.addEventListener('storage', checkLoginStatus);
    checkLoginStatus();

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <div className="app-container">
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/ash-shohwah">Ash-shohwah</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={() => {
                  localStorage.removeItem('loggedInUser');
                  setIsLoggedIn(false);
                }}>Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ash-shohwah"
            element={
              <ProtectedRoute>
                <Ashshohwah />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;