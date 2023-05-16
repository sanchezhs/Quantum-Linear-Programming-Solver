import { useContext, useReducer, useState } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  ButtonGroup,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import { Drawer, Divider } from "@mui/material";
import { Optimization, Problem, Backend } from "./index";
import { sendSettings } from "../../Actions/index";
import { checkSettings } from "./checkSettings";

export type State = {
  upperBound: string;
  lowerBound: string;
  depth: string;
  seed: string;
  backend: string;
};

export type Action =
  | { type: "setUpperBound"; payload: string }
  | { type: "setLowerBound"; payload: string }
  | { type: "setSeed"; payload: string }
  | { type: "setDepth"; payload: string }
  | { type: "setBackend"; payload: string };

const initialState: State = {
  upperBound: "10",
  lowerBound: "0",
  seed: String(Math.floor(Math.random() * 10000)),
  depth: "1",
  backend: "simulator",
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "setUpperBound":
      return { ...state, upperBound: action.payload };
    case "setLowerBound":
      return { ...state, lowerBound: action.payload };
    case "setDepth":
      return { ...state, depth: action.payload };
    case "setSeed":
      return { ...state, seed: action.payload };
    case "setBackend":
      return { ...state, backend: action.payload };
    default:
      throw new Error();
  }
}

export function Slider() {
  const { openPanel, setOpenPanel, showErrorModal } = useContext(AppContext);
  const [showToast, setShowToast] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!checkSettings(state, showErrorModal)) return;
    sendSettings(state, setShowToast);
    console.log(state);
  };

  return (
    <Drawer anchor="right" open={openPanel} onClose={() => setOpenPanel(false)}>
      <div className="panel-container">
        <Container style={{ marginTop: "25px" }}>
          <Divider style={{ margin: "2px 5px" }}>
            <h5>Problem Parameters</h5>{" "}
          </Divider>
          <Form>
            <Row>
              <Col>
                <Problem state={state} dispatch={dispatch} />
              </Col>
            </Row>
            <Divider style={{ margin: "2px 5px" }}>
              <h5>Optimization Parameters</h5>{" "}
            </Divider>
            <Row>
              <Col>
                <Optimization state={state} dispatch={dispatch} />
              </Col>
            </Row>
            <Divider style={{ margin: "2px 5px" }}>
              <h5>Run Options</h5>{" "}
            </Divider>
            <Row>
              <Col>
                <Backend dispatch={dispatch} />
              </Col>
            </Row>
            <Row style={{ marginTop: "25px" }}>
              <ButtonGroup>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Row>
          </Form>
        </Container>
      </div>
      <Toast style={{textAlign: 'center', position:'absolute', bottom: 5, right: 5}} onClose={() => setShowToast(false)} delay={5000} show={showToast} animation={false}>
        <Toast.Header>
          <strong className="me-auto">Success!</strong>
        </Toast.Header>
        <Toast.Body>Settings saved during this session</Toast.Body>
      </Toast>
    </Drawer>
  );
}
