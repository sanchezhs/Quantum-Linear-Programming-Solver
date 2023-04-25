import {Table as BTable, Form} from 'react-bootstrap'
import { Backend } from "../../../context/AppContext";
import { State } from './BackEnds'

function Table({ state, selectedBackend, handleSelectBackend }: {
    state: State,
    selectedBackend: string,
    handleSelectBackend: (backendName: string) => void
}) {
  console.count("Table")
  return (
         <div className="table-responsive">
            <BTable hover>
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
                {state.displayedBackends.map((backend: Backend) => (
                  <tr key={backend.name}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={
                          selectedBackend && selectedBackend === backend.name
                            ? true
                            : false
                        }
                        disabled={
                          selectedBackend && selectedBackend !== backend.name
                            ? true
                            : false
                        }
                        onChange={() => handleSelectBackend(backend.name)}
                      />
                    </td>
                    <td>{backend.name}</td>
                    <td>{backend.num_qubits}</td>
                    <td>{backend.is_simulator ? "Yes" : "No"}</td>
                    <td>{backend.operational ? "Yes" : "No"}</td>
                    <td>{backend.status_msg}</td>
                    <td>{backend.pending_jobs}</td>
                  </tr>
                ))}
              </tbody>
            </BTable>
          </div>
  )
}

export default Table