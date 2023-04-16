import MainForm from "./components/MainForm";
import Navigation from "./components/Navigation";
import MyDropzone from "./components/DropZone";
import axios from "axios";
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navigation />
      <Container> 
        <Row>
        <h1>How To</h1>
        </Row>
        <Row>
          <Col>
            <MainForm />
          </Col>
          <Col>
            <MyDropzone />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
