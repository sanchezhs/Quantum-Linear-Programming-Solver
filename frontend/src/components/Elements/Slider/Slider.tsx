import { useContext, useReducer } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import { AppContext } from "../../../context/AppContext";
import SlidingPanel from "react-sliding-side-panel";
import { Optimization, Problem, Backend  } from './index'
import { sendSettings } from "../../Actions/index";

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
  const { openPanel, setOpenPanel } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendSettings(state);
    console.log(state);
  };

  return (
    <>
      <SlidingPanel type={"right"} isOpen={openPanel} size={30}>
        <>
          <div className="panel-container">
            <Container style={{ marginTop: "25px" }}>
              <h5>Problem Parameters</h5>
              <Form>
                <Row>
                  <Col>
                    <Problem state={state} dispatch={dispatch} />
                  </Col>
                </Row>
                <h5>Optimization Parameters</h5>
                <Row>
                  <Col>
                    <Optimization state={state} dispatch={dispatch} />
                  </Col>
                </Row>
                <h5>Run Options</h5>
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
                      onClick={() => setOpenPanel(false)}
                    >
                      Close
                    </Button>
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
              {/*               <Row>
                <Col>
                  <Button
                    style={{
                      position: "absolute",
                      bottom: 10,
                      justifyContent: "center",
                    }}
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setOpenPanel(false)}
                  >
                    close
                  </Button>
                </Col>
              </Row> */}
            </Container>
          </div>
        </>
      </SlidingPanel>
    </>
  );
}
