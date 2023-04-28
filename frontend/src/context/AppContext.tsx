import { createContext, useState } from "react";

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
  constraints: { id: number; value: string }[];
  modalShow: { show: boolean; body: string[] };
  backends: Backend[];
  solution: [];
  setSolution: (solution: string) => void;
  setBackends: (backends: Backend[]) => void;
  showErrorModal: (errors: string[]) => void;
  setModalShow: (modalShow: ErrorModal) => void;
  createConstraint: () => void;
  setConstraints: (constraints: Constraints[]) => void;
  deleteConstraint: (index: number) => void;
};

export const AppContext = createContext<AppContextType>(
  {
    constraints: [],
    modalShow: { show: false, body: [] },
    backends: [],
    solution: [],
    setSolution: () => {},
    setBackends: () => {},
    showErrorModal: () => {},
    setModalShow: () => {},
    createConstraint: () => {},
    setConstraints: () => {},
    deleteConstraint: () => {},
  }
); 


export function AppContextProvider({ children, }: { children: React.ReactNode; }) {
  const [constraints, setConstraints] = useState<Constraints[]>([
    { id: 1, value: "" },
  ]);
  const [backends, setBackends] = useState<Backend[]>([]);
  const [solution, setSolution] = useState([]);
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

  function createConstraint() {
    setConstraints([
      ...constraints,
      {
        id:
          constraints.length > 0
            ? constraints[constraints.length - 1].id + 1
            : 1,
        value: "",
      },
    ]);
  }

  function deleteConstraint(index: number) {
    setConstraints((prevConstraints) =>
      prevConstraints.filter((constraint) => constraint.id !== index)
    );
  }

  return (
    <AppContext.Provider
      value={{
        constraints,
        modalShow,
        backends,
        solution,
        setSolution,
        setBackends,
        showErrorModal,
        setModalShow,
        createConstraint,
        setConstraints,
        deleteConstraint,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
