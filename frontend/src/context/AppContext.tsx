import { createContext, useState } from "react";


export interface FileSolution {
  objetive: string;
  vars_values: [{ string: string}];
  num_qubits: string;
  parameters: number[];
  circuit: { light: string; dark: string}
  histogram: string;
  qp: string
  qubo: string;
  qasm: string;
}

export interface InputSolution {
  objetive: string;
  vars_values: [{ string: string}];
  num_qubits: string;
  parameters: number[];
  circuit: { light: string; dark: string}
  histogram: string;
  qp: string
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

export type AppContextType = {
  modalShow: { show: boolean; body: string[] };
  backends: Backend[];
  fileSolution: FileSolution | null;
  inputSolution: InputSolution | null;
  openPanel: boolean;
  setFileSolution: (FileSolution: FileSolution) => void;
  setInputSolution: (InputSolution: InputSolution) => void;
  setBackends: (backends: Backend[]) => void;
  showErrorModal: (errors: string[]) => void;
  setModalShow: (modalShow: ErrorModal) => void;
  setOpenPanel: (openPanel: boolean) => void;
};

export const AppContext = createContext<AppContextType>(
  {
    modalShow: { show: false, body: [] },
    backends: [],
    inputSolution: null,
    openPanel: false,
    fileSolution: null,
    setFileSolution: () => {},
    setInputSolution: () => {},
    setOpenPanel: () => {},
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
  const [openPanel, setOpenPanel] = useState(false);
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
        openPanel,
        setOpenPanel,
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
