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
import { GoogleOAuthProvider } from '@react-oauth/google';


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
            <Route path="/login" element={<GoogleOAuthProvider clientId="703726974799-7l44udcrh4vcqk19j1rvtdta6ok1mff0.apps.googleusercontent.com"><SocialLogin /></GoogleOAuthProvider>} />
            <Route path="/logout" element={<SocialLogout />} />
          </Routes>
        {/* <FooterBottom /> */}
      </Router>
    </>
  );
}

export default App
