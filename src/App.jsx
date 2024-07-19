import React from 'react';
import Menu from '../components/Menu'
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Homepage from '../pages/Homepage';
import FooterBottom from '../components/FooterBottom';
import SocialLogin from '../components/SocialLogin';
import SocialLogout from '../components/SocialLogout';
import Register from '../components/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../components/Login';

function App() {
  const get_Token = localStorage.getItem('access')
  return (
    <>
      <Router>
        <Menu />
          <Routes>
            <Route path="/" exact element={<Homepage/>} />
            {get_Token ? (<Route path="/login" exact element={<Navigate to="/logout" replace />} />) : 
            (<Route path="/logout" exact element={<Navigate to="/login" replace />} />)}
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<SocialLogout />} />
            <Route path="/register" element={<Register/>} />
            {get_Token ? (<Route path="/register" exact element={<Navigate to="/logout" replace />} />) : 
            (<Route path="/logout" exact element={<Navigate to="/login" replace />} />)}
          </Routes>
        {/* <FooterBottom /> */}
      </Router>
    </>
  );
}

export default App
