import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import Home from './component/home/Home';
import Addblog from './component/blog/Blog';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/Login" element={<Login />} />  
        <Route path="/SignUp" element={<SignUp />} /> 
        <Route path="/Addblog" element={<Addblog />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
