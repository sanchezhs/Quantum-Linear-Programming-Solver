import MainForm from "./components/MainForm";
import Navigation from "./components/Navigation";
import MyDropzone from "./components/dropzone/DropZone";
import Howto from "./components/Howto";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { FormContext } from "./context/AppContext";

function App() {
  const { theme } = useContext(FormContext);
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <Navigation />
      <Container>
        <Howto />
        <Row>
          <Col>
            <MainForm />
          </Col>
          <Col>
            <MyDropzone />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
