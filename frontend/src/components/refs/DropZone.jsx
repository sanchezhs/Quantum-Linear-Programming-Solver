import React, { useCallback, useState, useMemo, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { ScrollContext } from "../../context/ScrollContext";
import { AppContext } from "../../context/AppContext";
import Message from "../feedback/Message";

import axios from "axios";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  ":hover": {
    borderColor: "#2196f3",
    backgroundColor: "#123456",
  },
};

const activeStyle = {
  borderColor: "#0000ff",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff0000",
};

function MyDropzone() {
  const [fileContents, setFileContents] = useState("");
  const { fourthRef } = useContext(ScrollContext);
  const { showErrorModal } = useContext(AppContext);

  const sendFile = (fileContents) => {
    const host = "http://localhost:8000/upload/";
    axios
      .post(host, {
        fileContents: fileContents,
      })
      .then((response) => {
        console.log(response);
        alert("Success! Check the console for the results.");
      })
      .catch((error) => {
        console.log(error.response.data);
        showErrorModal([error.response.data.errors]);
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContents(event.target.result);
      sendFile(event.target.result);
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
    acceptedFiles,
    fileRejections,
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
        <div {...getRootProps({ className: "dropzone", style })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag and drop a file here, or click to select a file</p>
          )}
        </div>
        <Message fileContents={fileContents} />
      </section>
    </>
  );
}
export default MyDropzone;
