import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ThemeSwitch from "./ThemeSwitch";
import { useContext } from 'react'
import { ScrollContext } from '../context/ScrollContext'

function NavigationBar() {

 const { scrollToFirst, scrollToSecond, scrollToThird, scrollToFourth } = useContext(ScrollContext);


  return (
    <>
      <Navbar
        sticky="top"
        bg="primary"
        className="shadow p-3 mb-5 bg-body-tertiary"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#qaoa" onClick={scrollToFirst}>
            <img
              alt=""
              src="/wlogo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Quantum Solver
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#howto" onClick={scrollToSecond}>How To</Nav.Link>
            <Nav.Link href="#solver" onClick={scrollToThird}>Solver</Nav.Link>
            <Nav.Link href="#files" onClick={scrollToFourth}>Files</Nav.Link>
          </Nav>
          <ThemeSwitch />
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
