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


function App() {
  const access_key = localStorage.getItem('key')
  return (
    <>
      <Router>
        <Menu />
          <Routes>
            <Route path="/" exact element={<Homepage/>} />
            {access_key ? (<Route path="/login" exact element={<Navigate to="/logout" replace />} />) : 
            (<Route path="/logout" exact element={<Navigate to="/login" replace />} />)}
            <Route path="/login" element={<SocialLogin />} />
            <Route path="/logout" element={<SocialLogout />} />
          </Routes>
        <FooterBottom />
      </Router>
    </>
  );
}

export default App
