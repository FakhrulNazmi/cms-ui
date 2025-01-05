import React, { Fragment, useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { 
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate
} from "react-router-dom"


//components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Certificate from './components/Certificate';

// toast.configure()

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.token);
  const [loading, setLoading] = useState(true);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
  
  const setAuth = boolean => {
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      const response = await fetch('http://localhost:27017/auth/is-verify', {
        method: "GET",
        headers: {
          token: localStorage.token
        }
      })

      const parseRes = await response.json()
      parseRes.ok === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
      console.log(`dashboard: ${parseRes}`)
    } catch (error) {
      console.error(error.message)
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading after check
    }
  }
  useEffect(() => {
    isAuth() 
  }, [])

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while authentication check is running
  }
  return (
    
    <Fragment>
      <Router>
      <Navbar /> 
        <div className="container">
        <div>
        <ToastContainer position="top-right" autoClose={3000} />
        </div>
          <Routes>
            <Route 
              path='/login' 
              element={
                isAuthenticated 
                  ? <Navigate to="/dashboard" /> 
                  : <Login setAuth={setAuth} login={login} />
              }  
            />
            <Route 
              path='/certificate' 
              element={
                isAuthenticated 
                  ? <Certificate /> 
                  : <Navigate to="/login" />
              }  
            />
            <Route 
              path='/register' 
              element={<Register />} 
            />
            <Route 
              path='/dashboard' 
              element={
                isAuthenticated 
                  ? <Dashboard setAuth={setAuth} logout={logout} />
                  : <Navigate to="/login" />
              } 
            />
            <Route 
              path='*' 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
    
  );
}
export default App;
