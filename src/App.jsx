import Search from '../components/Search'
import Menu from '../components/Menu'
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from '../pages/Homepage';
import FooterBottom from '../components/FooterBottom';


function App() {
  return (
    <>
     <Router>
        <Menu/>
        <Routes> 
            <Route path = "/" exact element ={<Homepage/>}/>
        </Routes>
        <FooterBottom/>
    </Router>
    </>
  )
}

export default App
