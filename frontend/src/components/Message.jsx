import Card from "react-bootstrap/Card";


function Message(props) {
  const acceptedFileItems = props.acceptedFiles.map((file) => (
    <div key={file.path}>
      <Card border="primary" bg="Primary" text="dark" className="mb-2"
      style={{width: '30rem', margin: '10px'}}
      >
        <Card.Header>Accepted File</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            <dl className="row">
              <dt className="col-sm-3">File Name:</dt>
              <dd className="col-sm-9">{file.path}</dd>
              <dt className="col-sm-3">File Size:</dt>
              <dd className="col-sm-9">{file.size}</dd>
            </dl>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  const fileRejectionItems = props.fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <div>
      <ul>{acceptedFileItems}</ul>
      <ul>{fileRejectionItems}</ul>
    </div>
  );
}

export default Message;
