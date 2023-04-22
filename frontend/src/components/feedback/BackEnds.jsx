import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import MyPagination from "../MyPagination";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Backends() {
  const { backends, setBackends } = useContext(AppContext);
  const [selectedBackend, setSelectedBackend] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [displayedBackends, setDisplayedBackends] = useState(backends);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setDisplayedBackends(backends.slice(startIndex, endIndex));
  }, [backends, startIndex, endIndex]);

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  function compare(a, b) {
    if (a[sortField] < b[sortField]) {
      return -1;
    }
    if (a[sortField] > b[sortField]) {
      return 1;
    }
    return 0;
  }

  const handleOnSelect = (eventKey) => {
    if (sortDirection === "asc") {
      setSortDirection("desc");
      setBackends(backends.sort(compare).reverse());
    } else {
      setSortDirection("asc");
      setBackends(backends.sort(compare));
    }
    setSortField(eventKey);
    setDisplayedBackends(backends.slice(startIndex, endIndex));
  };

  const handleSelectBackend = (backendName) => {
    if (selectedBackend && selectedBackend === backendName) {
      setSelectedBackend("");
    } else {
      setSelectedBackend(backendName);
    }
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

          <Table striped bordered hover>
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
              {displayedBackends.map((backend) => (
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
