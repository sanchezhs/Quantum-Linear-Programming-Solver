import { useCallback, useState, useMemo, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollContext, AppContext } from "../../../context/index";
import { sendFile } from "../../Actions/sendFile";
import { Message } from "../../Elements/index";
import { baseStyle, acceptStyle, activeStyle, rejectStyle } from "./styles";
import { Howto } from "../../Layout/index";
import { FileSolTab } from "../../Solution/index";

/**
 *  This component is used to upload a file
 *
 */
export function MyDropzone() {
  const [fileContents, setFileContents] = useState("");
  const { fourthRef } = useContext(ScrollContext);
  const { showErrorModal } = useContext(AppContext);
  const { fileSolution, setFileSolution } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        setFileContents(event.target.result as string);
        sendFile(event.target.result as string, showErrorModal, setFileSolution);
      }
    };
    reader.readAsText(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
  } = useDropzone({
    onDrop,
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
      <section id="dropzone-section" className="container">
        <h3 ref={fourthRef}>File Upload</h3>
        <Howto />
        {/* <Message fileContents={fileContents} /> */}
        <div {...getRootProps({ className: "dropzone", style })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drop a file here, or click to select a file</p>
          )}
        </div>
      </section>
     { fileSolution && <FileSolTab fileSolution={fileSolution} fileContents={fileContents}/>}
    </>
  );
}
