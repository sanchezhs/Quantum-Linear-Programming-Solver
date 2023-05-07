import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from "react";
import { AppContext } from "../../../context/AppContext";
import type { Backend } from "../../../context/AppContext";
//import Table from './Table'
import { Row, Col } from 'react-bootstrap'
import { MyTable } from '../index'

export type State = {
  sortField: string;
  sortDirection: string;
  displayedBackends: Backend[];
};

type Action =
  | {
      type: ActionType.Sort;
      payload: { sortField: string; sortDirection: string };
    }
  | { type: ActionType.Display; payload: { displayedBackends: Backend[] } };

  enum ActionType {
  Sort = "sort",
  Display = "display",
}

const initialState: State = {
  sortField: "",
  sortDirection: "asc",
  displayedBackends: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.Sort:
      return {
        ...state,
        sortField: action.payload.sortField,
        sortDirection: action.payload.sortDirection,
      };
    case ActionType.Display:
      return {
        ...state,
        displayedBackends: action.payload.displayedBackends,
      };
    default:
      return state;
  }
};

export function Backends() {
  const { backends } = useContext(AppContext);
  const [selectedBackend, setSelectedBackend] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const compare = useCallback(
    (a: any, b: any) => {
      // Use useCallback to memoize the compare function
      if (a[state.sortField] < b[state.sortField]) {
        return state.sortDirection === "asc" ? -1 : 1;
      }
      if (a[state.sortField] > b[state.sortField]) {
        return state.sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    },
    [state.sortField, state.sortDirection]
  );

  useEffect(() => {
    dispatch({
      type: ActionType.Display,
      payload: {
        displayedBackends: backends.slice(startIndex, endIndex),
      },
    });
  }, [backends, startIndex, endIndex]);

  useEffect(() => {
    dispatch({
      type: ActionType.Display,
      payload: {
        displayedBackends: [...backends]
          .sort(compare)
          .slice(startIndex, endIndex),
      },
    });
  }, [backends, compare, state.sortDirection, state.sortField]);

  const handleOnSelect = (eventKey: any) => {
    dispatch({
      type: ActionType.Sort,
      payload: {
        sortField: eventKey,
        sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
      },
    });
  };

  const handleSelectBackend = (backendName: string) => {
    if (selectedBackend && selectedBackend === backendName) {
      setSelectedBackend("");
    } else {
      setSelectedBackend(backendName);
    }
  };

  const handleChangePage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  //const myTable = useMemo(() => {
  //  return (
  //    <Table state={state} selectedBackend={selectedBackend} handleSelectBackend={handleSelectBackend}/>
  //  )
  //}, [state, selectedBackend])

  return (
    <>
      <MyTable state={state}/>
      {backends.length > 0 && (
        <>
          <Row id="modal-row">
            <Col>
              <h5>Available Backends</h5>
            </Col>
            {/* <Col style={{ textAlign: "right" }}>
              <Dropdown handleOnSelect={handleOnSelect}/>
            </Col> */}
          </Row>
          {/* {myTable} */}
          {/* <MyPagination
            total={Math.ceil(backends.length / itemsPerPage)}
            current={page}
            onChangePage={handleChangePage}
          /> */}
        </>
      )}
    </>
  );
}

