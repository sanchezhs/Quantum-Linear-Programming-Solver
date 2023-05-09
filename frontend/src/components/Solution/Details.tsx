function getDetails(details: string, matrix_shape: any): {
  objetive: RegExpMatchArray | null;
  variables: string;
  status: string;
  shape: string;
} {
  const lines = details.split("\n");
  const objetiveLine = lines[0];
  const objetive = objetiveLine.match(/-?\d+/);

  const variablesLine = lines[1];
  const variables = "Not available";
  const status = "Not available";
  if (variablesLine) {

    const variables = variablesLine.split(":")[1];
    const status = lines[2].split(":")[1];
  }
  const shape = `${matrix_shape[0]}x${matrix_shape[1]}`

  return { objetive, variables, status, shape };
}

export function Details({ objetive, vars_values, matrix_shape, qubits }: 
  { objetive: string, vars_values: [{string: string}], matrix_shape: any, qubits: string }) {

  return (
    <>
      <dl id="modal-row" className="row">
        <dt className="col-sm-4 mb-3">Objetive value computed by QAOA</dt>
        <dd className="col-sm-8 mb-3">{objetive}
        </dd>

        <dt className="col-sm-4 mb-3">Values of the variables</dt>
        <dd className="col-sm-8 mb-3">
        {Object.keys(vars_values).map((key) => (
        <p key={key}>
          {key}: {vars_values[key]}
        </p>
      ))}
        </dd>

        <dt className="col-sm-4 mb-3">The resulting matrix has dimensions</dt>
        <dd className="col-sm-8 mb-3">
          <p>{matrix_shape}</p>
        </dd>

        <dt className="col-sm-4 mb-3">Number of qubits</dt>
        <dd className="col-sm-8 mb-3">
          <p>{qubits}</p>
        </dd>

      </dl>
    </>
  );
}
