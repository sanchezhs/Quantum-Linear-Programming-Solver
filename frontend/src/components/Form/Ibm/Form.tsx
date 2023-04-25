import { ApiForm } from './Input';
import { useContext, useState, useReducer } from "react";
import { AppContext } from "../../../context/index";
import { sendToken } from "../../Actions/index";

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
  

export function Form() {

    const { setBackends, showErrorModal } =
    useContext(AppContext);
  const [apiToken, setApiToken] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendToken(apiToken, setBackends, dispatch, showErrorModal);
  };


  return (
    <ApiForm state={state} setApiToken={setApiToken} apiToken={apiToken} handleSubmit={handleSubmit}  /> 
  )
}
