export function Details({ objetive, vars_values, qubits }: 
  { objetive: string, vars_values: [{string: string}], qubits: string }) {

  return (
    <>
      <dl id="modal-row" className="row">
        <dt className="col-sm-4 mb-3">Objetive value computed by QAOA</dt>
        <dd className="col-sm-8 mb-3">{objetive}
        </dd>

        <dt className="col-sm-4 mb-3">Values of the variables</dt>
        <dd className="col-sm-8 mb-3">
        {Object.keys(vars_values).map((key: any) => (
        <p key={key}>
          {key} = {vars_values[key]}
        </p>
      ))}
        </dd>

        <dt className="col-sm-4 mb-3">Number of qubits</dt>
        <dd className="col-sm-8 mb-3">
          <p>{qubits}</p>
        </dd>

      </dl>
    </>
  );
}
