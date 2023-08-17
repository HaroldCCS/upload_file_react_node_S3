import React, { useState } from "react";
import axios from "axios";

const host = "http://localhost:3002/api";

function App() {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    if (!file) return;

    try {
      //@INFO Validacion al endpoint antes de cargar el archivo (metadata u logica de negocio)
      const validateResponse = await fetch(host + "/validate-upload", {
        method: "POST",
        // body: formData,
      });
      const validateData = await validateResponse.json();
      if (!validateData.valid) return;


      //@INFO Obteniedo PreSigned de S3 para cargar la imagen desde react
      const uploadResponse = await fetch(host + "/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: file.name
        }),
      });
      const {data: uploadData} = await uploadResponse.json();

      if (!uploadData.url) {
        console.log("Upload URL not available");
        return;
      }


      const formData = new FormData();
      Object.entries(uploadData.fields).forEach(([field, value]) => {
        formData.append(field, value);
      });
      formData.append("file", file);


      //@INFO Consumiendo apli de AWS para guardar la imagen
      await axios.post(uploadData.url, formData, {
        method: 'PUT',
        headers: {'Content-Type': 'multipart/form-data'},
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
