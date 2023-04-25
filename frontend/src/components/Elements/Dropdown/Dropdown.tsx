import { Dropdown as BDropdown} from 'react-bootstrap'

export function Dropdown({ handleOnSelect }: any ) {
  return (
    <>
      <BDropdown className="mb-1" align="end" onSelect={handleOnSelect}>
        <BDropdown.Toggle size="sm" id="dropdown-basic">
          Sort
        </BDropdown.Toggle>
        <BDropdown.Menu>
          <BDropdown.Item eventKey="name">Name</BDropdown.Item>
          <BDropdown.Item eventKey="num_qubits">Qubits</BDropdown.Item>
          <BDropdown.Item eventKey="pending_jobs">Pending Jobs</BDropdown.Item>
        </BDropdown.Menu>
      </BDropdown>
    </>
  );
}
