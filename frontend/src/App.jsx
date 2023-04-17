import MainForm from "./components/MainForm";
import Navigation from "./components/Navigation";
import MyDropzone from "./components/dropzone/DropZone";
import Howto from "./components/Howto";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



function App() {
  return (
    <>
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
    </>
  );
}

export default App;
