import { createContext, useState } from "react";


export interface FileSolution {
  objetive: string;
  vars_values: [{ string: string}];
  num_qubits: string;
  parameters: number[];
  circuit: string;
  histogram: string;
  qubo: string;
  qasm: string;
}

export interface InputSolution {
  objetive: string;
  vars_values: [{ string: string}];
  num_qubits: string;
  parameters: number[];
  circuit: string;
  histogram: string;
  qubo: string;
  qasm: string;
}


export interface Backend {
  name: string;
  num_qubits: number;
  is_simulator: boolean;
  operational: boolean;
  pending_jobs: number;
  status_msg: string;
}

interface ErrorModal {
  show: boolean;
  body: string[];
}

export interface Constraints {
  id: number;
  value: string;
}

type AppContextType = {
  modalShow: { show: boolean; body: string[] };
  backends: Backend[];
  fileSolution: FileSolution | null;
  setFileSolution: (FileSolution: FileSolution) => void;
  inputSolution: InputSolution | null;
  setInputSolution: (InputSolution: InputSolution) => void;
  setBackends: (backends: Backend[]) => void;
  showErrorModal: (errors: string[]) => void;
  setModalShow: (modalShow: ErrorModal) => void;
};

export const AppContext = createContext<AppContextType>(
  {
    modalShow: { show: false, body: [] },
    backends: [],
    inputSolution: null,
    fileSolution: null,
    setFileSolution: () => {},
    setInputSolution: () => {},
    setBackends: () => {},
    showErrorModal: () => {},
    setModalShow: () => {},
  }
); 

/**
 *  AppContextProvider, provides the context to the entire app
 *  Backends: List of available backends
 *  FileSolution: Problem from file upload
 *  InputSolution: Problem from input form
 *  ModalShow: Modal to show errors
 */
export function AppContextProvider({ children, }: { children: React.ReactNode; }) {
  const [backends, setBackends] = useState<Backend[]>([]);
  const [fileSolution, setFileSolution] = useState<FileSolution | null>(null);
  const [inputSolution, setInputSolution] = useState<InputSolution | null>(null);
  const [modalShow, setModalShow] = useState<ErrorModal>({
    show: false,
    body: [],
  });

  function showErrorModal(errors: string[]) {
    let body: string[] = [];
    errors.forEach((error) => {
      body.push(error);
    });
    setModalShow({
      show: true,
      body,
    });
  }

  return (
    <AppContext.Provider
      value={{
        modalShow,
        backends,
        fileSolution,
        inputSolution,
        setFileSolution,
        setInputSolution,
        setBackends,
        showErrorModal,
        setModalShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
