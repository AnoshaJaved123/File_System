import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Login from './Components/Login'
import Signup from './Signup'
import Main from "./Main";

import "./App.css";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route exact path='/' element={<Login />} /> */}
          <Route exact path='/' element={<Signup />} />
          <Route exact path='/dashboard' element={<Main />} />
        </Routes>
      </Router>    </div>
  );
}

export default App;
