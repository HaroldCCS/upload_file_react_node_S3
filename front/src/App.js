import React, { useState, useRef } from "react";
import FilesComponent from "./components/file/filesComponent";
import "./app.css";

function App() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFiles((prevFiles) => {
      const newFiles = Array.from(e.target.files);

      // Verificar si algún nuevo archivo ya existe en la lista actual basándote en la última fecha de modificación
      const uniqueNewFiles = newFiles.filter(
        (newFile) =>
          !prevFiles.some(
            (prevFile) => prevFile.lastModified === newFile.lastModified
          )
      );

      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((file, i) => i !== index);
    setFiles(updatedFiles);
    fileInputRef.current.value = "";
  };

  return (
    <div className="app-container">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      <div className="container-files">
        {!!files.length &&
          files.map((_file, index) => (
            <FilesComponent
              key={index}
              file={_file}
              handleDelete={() => handleRemoveFile(index)}
            />
          ))}
      </div>

      <br />
    </div>
  );
}

export default App;
