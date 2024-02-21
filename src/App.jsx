import Search from '../components/Search'
import Menu from '../components/Menu'
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
     <Router>
        <Menu/>
        <Routes> 
            <Route path = "/search/location" exact element ={<Search/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
