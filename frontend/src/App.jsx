import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home, Input, Files, NotFound } from "./pages/index" 
import { Routes, Route } from "react-router-dom";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" id={theme}>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solver" element={<Input />} />
          <Route path="/files" element={<Files />} />
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
      {/*       <Navbar />
      <Container>
        <Row>
          <Qaoa />
        </Row>
          <Row>
            <Ibm />
          </Row>
        <Row>
          <Form />
        </Row>
        <Row>
          <Dropzone />
        </Row>
      </Container>
      <Footer /> */}
    </div>
  );
}

export default App;
