import React, { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Message from "./Message";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
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

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff0000",
};

function MyDropzone() {
  const [fileContents, setFileContents] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContents(event.target.result);
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
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      ...(isDragActive ? activeStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );



  return (
    <section className="container">
      {" "}
      <div {...getRootProps({ className: "dropzone", style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop a file here, or click to select file</p>
        )}
      </div>
      <aside className="text-center mx-auto">
        <Message
          acceptedFiles={acceptedFiles}
          fileRejections={fileRejections}
        />
      </aside>
      {fileContents && <p>File contents: {fileContents}</p>}
    </section>
  );
}

export default MyDropzone;
