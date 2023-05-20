import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Home, Input, Files, NotFound } from "./pages/index" 
import { Routes, Route } from "react-router-dom";
import { MathJaxContext } from 'better-react-mathjax'
import { Modal } from "./components/Elements/index";
import { Slider } from './components/Slider/index'


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <MathJaxContext>
    <div className="App" id={theme}>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solver" element={<Input />} />
          <Route path="/files" element={<Files />} />
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Modal/>
      <Slider/> 
      </div>
      <Footer />
      </MathJaxContext>
  );
}

export default App;
