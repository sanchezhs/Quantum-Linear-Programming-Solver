import { ApiForm } from './ApiForm';
import { useContext, useState, useReducer } from "react";
import { AppContext } from "../../../context/index";
import { sendToken } from "../../Actions/index";
import { Backends } from '../../Elements/index'

export type State = {
  waiting: boolean;
  submitted: boolean;
}

const initialState: State = {
  waiting: false,
  submitted: false,
};

export enum ActionType {
  SetWaiting = "setWaiting",
  SetSubmitted = "setSubmitted",
}

export type Action =
  | { type: ActionType.SetWaiting; payload: boolean }
  | { type: ActionType.SetSubmitted; payload: boolean };


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SetWaiting:
      return { ...state, waiting: action.payload };
    case ActionType.SetSubmitted:
      return { ...state, submitted: action.payload };
    default:
      return state;
  }
};

export function IBM() {
  const { setBackends, showErrorModal } =
    useContext(AppContext);
  const [apiToken, setApiToken] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendToken(apiToken, setBackends, dispatch, showErrorModal);
  };

  return (
    <>
      <h3>IBM Quantum</h3>
      <p>
        If you want to use your own IBM Quantum account to use a IBM quantum
        computer in the cloud, you can do it by entering your API token. You can
        find it in your IBM Quantum account, in the "Account settings / Account
        overview" section.
      </p>
      <p>
        Once you have entered your API token, you will see the available
        backends in the "Backends" section so you can choose the one you want to
        use later.
      </p>
      <p>
        If you don't have an account, you can create one for free{" "}
        <a
          className="link-primary"
          href="https://quantum-computing.ibm.com/login"
        >
          here
        </a>
        .
      </p>

      <ApiForm state={state} setApiToken={setApiToken} apiToken={apiToken} handleSubmit={handleSubmit}  />
      <Backends />
    </>
  );
}

