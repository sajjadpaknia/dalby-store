import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./Common/Container/Container";
import Home from "./Pages/Home/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
