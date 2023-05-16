import { useCallback, useState, useMemo, useContext, useEffect } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import Spinner from "react-bootstrap/Spinner";
import { AppContext } from "../../context/index";
import { sendFile } from "../../components/Actions/sendFile";
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from "./styles";
import { Howto } from "./Howto/Howto";
import { FileSolTab } from "../../components/Solution/index";

/**
 *  This component is used to display the dropzone
 *  where the user can drop the file to be solved
 */
export function MyDropzone() {
  const [showWaiting, setShowWaiting] = useState(false);
  const { showErrorModal } = useContext(AppContext);
  const { fileSolution, setFileSolution } = useContext(AppContext);
  const [onSimulator, setOnSimulator] = useState(false);

  // This useEffect is used to hide
  // the spinner when the fileSolution is set
  useEffect(() => {
    setShowWaiting(false);
  }, [fileSolution]);

  const onDropAccepted = useCallback((acceptedFiles: Blob[]) => {
    setShowWaiting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        sendFile(
          event.target.result as string,
          showErrorModal,
          setFileSolution,
          setShowWaiting
        );
      }
    };
    reader.readAsText(acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[], event: DropEvent) => {
      showErrorModal(["File rejected", "Please upload a .txt file"]);
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    //onDrop,
    accept: { "text/plain": [".txt"] },
    maxFiles: 1,
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(isDragActive ? activeStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <>
      <section id="content-section" className="container">
        <h3>File Upload</h3>
        <Howto />
        <div {...getRootProps({ className: "dropzone", style })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : showWaiting ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <p>Drop a file here, or click to select a file</p>
          )}
        </div>
        {onSimulator && 
        <p>simulator</p>
        }
        {fileSolution && <FileSolTab fileSolution={fileSolution} />}
      </section>
    </>
  );
}
