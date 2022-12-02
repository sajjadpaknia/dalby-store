import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<SignUp />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
