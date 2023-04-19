import { useContext } from "react";
import { FormContext } from "./context/AppContext";
import Navigation from "./components/Navigation";
import Qaoa from "./components/refs/Qaoa"; 
import MainForm from "./components/refs/MainForm";
import Howto from "./components/refs/Howto";
import MyDropzone from "./components/refs/DropZone";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  const { theme } = useContext(FormContext);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <Navigation />
      <Container>
        <Row>
          <Qaoa />
        </Row>
        <Row>
          <Howto />
        </Row>
        <Row>
          <MainForm />
        </Row>
        <Row>
          <MyDropzone />
        </Row>
      </Container>
    </div>
  );
}

export default App;
