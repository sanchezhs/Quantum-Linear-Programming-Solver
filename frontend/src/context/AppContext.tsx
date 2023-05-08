import { createContext, useState } from "react";

export interface Solution {
  num_qubits: string;
  circuit: string;
  histogram: string;
  matrix_shape: [number, number];
  details: string;
  qubo: string;
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
  solution: Solution | null;
  setSolution: (solution: Solution) => void;
  setBackends: (backends: Backend[]) => void;
  showErrorModal: (errors: string[]) => void;
  setModalShow: (modalShow: ErrorModal) => void;
};

export const AppContext = createContext<AppContextType>(
  {
    modalShow: { show: false, body: [] },
    backends: [],
    solution: null,
    setSolution: () => {},
    setBackends: () => {},
    showErrorModal: () => {},
    setModalShow: () => {},
  }
); 


export function AppContextProvider({ children, }: { children: React.ReactNode; }) {
  const [backends, setBackends] = useState<Backend[]>([]);
  const [solution, setSolution] = useState<Solution>(null);
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
        solution,
        setSolution,
        setBackends,
        showErrorModal,
        setModalShow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
