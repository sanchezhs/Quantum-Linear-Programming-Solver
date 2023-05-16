import { Navbar as BootstrapNavBar, Nav, Button } from "react-bootstrap";
import { ThemeSwitch } from "../ThemeSwitch";
import { AppContext } from "../../context";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import TuneIcon from '@mui/icons-material/Tune';

export function Navbar() {
  const { setOpenPanel } = useContext(AppContext);
  return (
    <>
      <BootstrapNavBar
        sticky="top"
        bg="primary"
        className="shadow p-3 mb-5 bg-body-tertiary"
        variant="dark"
      >
            <img
              alt=""
              src="/wlogo.svg"
              width="35"
              height="35"
              className="d-inline-block align-top"
              style={{marginRight: '10px'}}
            />{" "}
          <NavLink className='nav-links' to="/">
            Home
          </NavLink>
          <Nav className="me-auto">
            <NavLink className='nav-links' to="/solver">
              Solver
            </NavLink>
            <NavLink className='nav-links' to="/files">
              File
            </NavLink>
          </Nav>
          <Button 
            variant="outline-light"
            onClick={() => setOpenPanel(true)}
            style={{marginRight: '10px'}}
          >
            <TuneIcon fontSize="small"/>
          </Button>
          <ThemeSwitch /> 
      </BootstrapNavBar>
    </>
  );
}
