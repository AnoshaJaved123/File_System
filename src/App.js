import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={<Main />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
