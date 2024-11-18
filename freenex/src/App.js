
import './App.css';
import { useState, useContext, useEffect, useMemo } from "react"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Nearby from './pages/Nearby';
import Projects from './pages/Projects';
import Messages from './pages/Messages';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthContext from './context';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setAuthenticated(true)
    }
  }, [isAuthenticated])
  const authContextValue = useMemo(() => ({ isAuthenticated, setAuthenticated }), [isAuthenticated, setAuthenticated]);

  return (
    <AuthContext.Provider value={authContextValue} >
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
