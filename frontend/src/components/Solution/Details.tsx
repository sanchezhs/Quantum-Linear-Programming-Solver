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
  const variables = variablesLine.split(":")[1];
  const status = lines[2].split(":")[1];

  const shape = `${matrix_shape[0]}x${matrix_shape[1]}`

  return { objetive, variables, status, shape };
}

export function Details({ details, matrix_shape, qubits }: { details: string, matrix_shape: any, qubits: string }) {
  const { objetive, variables, status, shape } = getDetails(details, matrix_shape);
  return (
    <>
      <dl id="modal-row" className="row">
        <dt className="col-sm-4 mb-3">Objetive value computed by QAOA</dt>
        <dd className="col-sm-8 mb-3">{objetive}</dd>

        <dt className="col-sm-4 mb-3">Values of the variables</dt>
        <dd className="col-sm-8 mb-3">
          <p>{variables}</p>
        </dd>

        <dt className="col-sm-4 mb-3">Status</dt>
        <dd className="col-sm-8 mb-3">
          <p>{status}</p>
        </dd>

        <dt className="col-sm-4 mb-3">The resulting matrix has dimensions</dt>
        <dd className="col-sm-8 mb-3">
          <p>{shape}</p>
        </dd>

        <dt className="col-sm-4 mb-3">Number of qubits</dt>
        <dd className="col-sm-8 mb-3">
          <p>{qubits}</p>
        </dd>

      </dl>
    </>
  );
}
