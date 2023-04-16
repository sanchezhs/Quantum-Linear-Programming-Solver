import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <>
      <Navbar bg="primary" className='d-flex' variant="dark">
        <Container fluid>
          <Navbar.Brand  href="#home">
            <img
              alt=""
              src="/wlogo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Quantum Solver
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;