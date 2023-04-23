import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useReducer,
} from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import MyPagination from "../MyPagination";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const initialState = {
  sortField: "name",
  sortDirection: "asc",
  displayedBackends: [],
  // sortedBackends: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "sort":
      return {
        ...state,
        sortField: action.payload.sortField,
        sortDirection: action.payload.sortDirection,
      };
    case "display":
      return {
        ...state,
        displayedBackends: action.payload.displayedBackends,
        // sortedBackends: action.payload.sortedBackends,
      };
    default:
      throw new Error();
  }
}

function Backends() {
  const { backends } = useContext(AppContext);
  const [selectedBackend, setSelectedBackend] = useState("");
  const [page, setPage] = useState(1);
  // const [sortField, setSortField] = useState("name");
  // const [sortDirection, setSortDirection] = useState("asc");
  // const [displayedBackends, setDisplayedBackends] = useState(backends);
  // const [sortedBackends, setSortedBackends] = useState(backends); // New state for sorted backends
  const [state, dispatch] = useReducer(reducer, initialState);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const compare = useCallback(
    (a, b) => {
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
      type: "display",
      payload: {
        displayedBackends: backends.slice(startIndex, endIndex),
        // sortedBackends: backends,
      },
    });
  }, [backends, startIndex, endIndex]);

  useEffect(() => {
    dispatch({
      type: "display",
      payload: {
        displayedBackends: [...backends].sort(compare).slice(startIndex, endIndex), // backends.slice(startIndex, endIndex),
        // sortedBackends: [...backends].sort(compare),
      },
    });
  }, [backends, compare, state.sortDirection, state.sortField]);

  // useEffect(() => {
  //   setDisplayedBackends(sortedBackends.slice(startIndex, endIndex)); // Display sorted backends
  // }, [sortedBackends, startIndex, endIndex]);

  // useEffect(() => {
  //   setSortedBackends([...backends].sort(compare)); // Sort the backends when sortField or sortDirection changes
  // }, [backends, compare, sortDirection, sortField]);



  const handleOnSelect = (eventKey) => {
    dispatch({
      type: "sort",
      payload: {
        sortField: eventKey,
        sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
      },
    });
    // setSortField(eventKey);
    // setSortDirection((prevSortDirection) =>
    //   prevSortDirection === "asc" ? "desc" : "asc"
    // );
  };

  const handleSelectBackend = (backendName) => {
    if (selectedBackend && selectedBackend === backendName) {
      setSelectedBackend("");
    } else {
      setSelectedBackend(backendName);
    }
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      {backends.length > 0 && (
        <>
          <Row id="modal-row">
            <Col>
              <h5>Available Backends</h5>
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Dropdown className="mb-1" align="end" onSelect={handleOnSelect}>
                <Dropdown.Toggle size="sm" id="dropdown-basic">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                  <Dropdown.Item eventKey="qubits">Qubits</Dropdown.Item>
                  <Dropdown.Item eventKey="pending_jobs">
                    Pending Jobs
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Name</th>
                  <th>Qubits</th>
                  <th>Simulator</th>
                  <th>Operational</th>
                  <th>Status</th>
                  <th>Pending Jobs</th>
                </tr>
              </thead>
              <tbody>
                {state.displayedBackends.map((backend) => (
                  <tr key={backend.name}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={
                          selectedBackend && selectedBackend === backend.name
                        }
                        disabled={
                          selectedBackend && selectedBackend !== backend.name
                        }
                        onChange={() => handleSelectBackend(backend.name)}
                      />
                    </td>
                    <td>{backend.name}</td>
                    <td>{backend.qubits}</td>
                    <td>{backend.is_simulator ? "Yes" : "No"}</td>
                    <td>{backend.operational ? "Yes" : "No"}</td>
                    <td>{backend.status_msg}</td>
                    <td>{backend.pending_jobs}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <MyPagination
            total={Math.ceil(backends.length / itemsPerPage)}
            current={page}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
}

export default Backends;
