import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import Navigation from "./components/Navigation";
import Qaoa from "./components/Refs/Qaoa";
import MainForm from "./components/Refs/MainForm";
import Howto from "./components/Refs/Howto";
import Footer from "./components/Refs/Footer";
import MyDropzone from "./components/Refs/DropZone";
import IBM from "./components/Refs/IBM";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


function App() {
  const { theme } = useContext(AppContext);

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
            <IBM />
          </Row>
        <Row>
          <MainForm />
        </Row>
        <Row>
          <MyDropzone />
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
