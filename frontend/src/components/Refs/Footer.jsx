import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Container id="footer-div" fluid style={{textAlign: 'center'}}>
      <Row id="footer-row">
        <Col>QAOA Quantum Optimizer</Col>
      </Row>
      <Row id="footer-row">
        <Col>
            <a href="https:www.github.com/sanchezhs">
            <GitHubIcon/>
            </a>
        </Col>
      </Row>
    </Container>
  );
};
export default Footer;
