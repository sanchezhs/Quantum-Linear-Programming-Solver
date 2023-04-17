import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ThemeSwitch from './ThemeSwitch';


function NavigationBar() {
  return (
    <>
      <Navbar bg="primary" className='shadow p-3 mb-5 bg-body-tertiary' variant="dark">
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
        <ThemeSwitch />
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;