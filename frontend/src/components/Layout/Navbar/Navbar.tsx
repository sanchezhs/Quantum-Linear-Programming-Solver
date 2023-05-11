import { Navbar as BootstrapNavBar, Nav, Container } from "react-bootstrap";
import ThemeSwitch from "../../ThemeSwitch";
import { useContext } from "react";
import { ScrollContext } from "../../../context/ScrollContext";

export function Navbar() {
  const { scrollToFirst, scrollToThird, scrollToFourth } =
    useContext(ScrollContext);

  return (
    <>
      <BootstrapNavBar
        sticky="top"
        bg="primary"
        className="shadow p-3 mb-5 bg-body-tertiary"
        variant="dark"
      >
        <Container fluid>
          <BootstrapNavBar.Brand href="#qaoa" onClick={scrollToFirst}>
            <img
              alt=""
              src="/wlogo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Quantum Solver
          </BootstrapNavBar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#solver" onClick={scrollToThird}>
              Solver
            </Nav.Link>
            <Nav.Link href="#files" onClick={scrollToFourth}>
              Files
            </Nav.Link>
          </Nav>
          <ThemeSwitch />
        </Container>
      </BootstrapNavBar>
    </>
  );
}
