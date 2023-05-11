import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Footer, Navbar, Howto, Qaoa } from './components/Layout/index';
import { Form, Dropzone, Ibm } from './components/Form/index'; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" id={theme}>
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
