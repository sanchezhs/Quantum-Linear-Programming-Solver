import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [constraints, setConstraints] = useState([{ id: 1, value: "" }]);
  const [objetive, setObjetive] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [theme, setTheme] = useState("light");
  const [apiToken, setApiToken] = useState("");
  const [backends, setBackends] = useState([]);
  const [modalShow, setModalShow] = useState({
    show: false,
    body: [],
  });

  function showErrorModal(errors) {
    let body = [];
    errors.forEach(error => {
      body.push(error)
    });
    setModalShow({
      show: true,
      body
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

  function deleteConstraint(index) {
    setConstraints((prevConstraints) =>
      prevConstraints.filter((constraint) => constraint.id !== index)
    );
  }

  return (
    <AppContext.Provider
      value={{
        constraints,
        objetive,
        radioValue,
        theme,
        modalShow,
        apiToken,
        backends,
        setBackends,
        setApiToken,
        showErrorModal,
        setModalShow,
        setTheme,
        setRadioValue,
        createConstraint,
        setConstraints,
        deleteConstraint,
        setObjetive,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
