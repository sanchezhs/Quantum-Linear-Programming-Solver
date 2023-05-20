import Alert from "react-bootstrap/Alert";

type Props = {
  showMessage: { show: boolean; error: boolean };
  setShowMessage: React.Dispatch<
    React.SetStateAction<{ show: boolean; error: boolean }>
  >;
};

export function Message({ showMessage, setShowMessage }: Props) {
  let body = "";
  let variant = "";
  if (showMessage.error) {
    body = "Error! Check your settings and try again";
    variant = "danger";
  } else {
    body = "Success! Settings have been saved";
    variant = "success";
  }

  if (showMessage.show) {
    return (
      <Alert
        style={{ marginTop: "10px", textAlign: "center", fontSize: "12pt" }}
        onClose={() => setShowMessage({ show: false, error: false })}
        key={variant}
        variant={variant}
        dismissible
      >
        {body}
      </Alert>
    );
  } else {
    return <></>;
  }
}
