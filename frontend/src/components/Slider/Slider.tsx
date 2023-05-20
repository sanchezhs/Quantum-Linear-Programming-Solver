import { useContext, useReducer, useState } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { Drawer, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Optimization,
  Problem,
  Backend,
  Message,
  checkSettings,
} from "./index";
import { sendSettings } from "../Actions/index";

export type State = {
  upperBound: string;
  lowerBound: string;
  depth: string;
  seed: string;
  shots: string;
  simulator: boolean;
  token: string;
};

export type Action =
  | { type: "setUpperBound"; payload: string }
  | { type: "setLowerBound"; payload: string }
  | { type: "setDepth"; payload: string }
  | { type: "setSeed"; payload: string }
  | { type: "setShots"; payload: string }
  | { type: "setIsSimulator"; payload: boolean }
  | { type: "setToken"; payload: string };

const initialState: State = {
  upperBound: "10",
  lowerBound: "0",
  depth: "1",
  seed: String(Math.floor(Math.random() * 10000)),
  shots: "1000",
  simulator: true,
  token: 'empty',
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
    case "setShots":
      return { ...state, shots: action.payload };
    case "setIsSimulator":
      return { ...state, simulator: action.payload };
    case "setToken":
      return { ...state, token: action.payload };
    default:
      throw new Error();
  }
}

export function Slider() {
  const { openPanel, setOpenPanel, showErrorModal } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showMessage, setShowMessage] = useState({ show: false, error: false });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!checkSettings(state, showErrorModal)) return;
    sendSettings(state, setShowMessage);
    console.log(state);
  };

  return (
    <Drawer
      anchor="right"
      open={openPanel}
      onClose={() => setOpenPanel(false)}
      PaperProps={{
        sx: {
          boxShadow: 10,
        },
      }}
    >
      <div className="panel-container">
        <Container style={{ marginTop: "25px" }}>
          <Button
            style={{ position: "absolute", top: 5, left: 5 }}
            size="sm"
            variant="outline-secondaty"
            onClick={() => {
              setOpenPanel(false);
              setShowMessage({ show: false, error: false });
            }}
          >
            <CloseIcon />
          </Button>
          <Divider style={{ margin: "2px 5px" }}>
            <h5>Problem Parameters</h5>
          </Divider>
          <Form>
            <Row>
              <Col>
                <Problem state={state} dispatch={dispatch} />
              </Col>
            </Row>
            <Divider style={{ margin: "2px 5px" }}>
              <h5>Optimization Parameters</h5>
            </Divider>
            <Row>
              <Col>
                <Optimization state={state} dispatch={dispatch} />
              </Col>
            </Row>
            <Divider style={{ margin: "2px 5px" }}>
              <h5>Run Options</h5>  
            </Divider>
            <Row>
              <Col>
                <Backend state={state} dispatch={dispatch} />
              </Col>
            </Row>
            <Message
              showMessage={showMessage}
              setShowMessage={setShowMessage}
            />
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
    </Drawer>
  );
}
