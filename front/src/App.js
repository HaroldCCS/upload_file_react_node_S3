import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "./components/progressBar";
import RenderFile from "./components/renderFile";

const host = "http://localhost:3002/api";
const folder_aws_s3 = "test_front";

function App() {
  const [file, setFile] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [filePathAws, setFilePathAws] = useState("");
  const [errorMessage, serErrorMessage] = useState("");

  const handleFileChange = (e) => {
    serErrorMessage("");
    setDefaultStates()
    setFile(e.target.files[0]);
  };

  const setDefaultStates = () => {
    setFilePathAws("");
    setProgressBar(0);
  }

  const failRequest = (error = '') =>{
    console.log('file error:', error);
    setDefaultStates()
    serErrorMessage("Ha ocurrido un error al cargar el archivo, vuelve a intentarlo")
  }

  const handleUpload = async () => {
    if (!file) return;

    try {
      setProgressBar(0.1);
      //@INFO Obteniedo PreSigned de S3 para cargar la imagen desde react
      const uploadResponse = await fetch(host + "/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folder: folder_aws_s3,
          contentType: file.type,
        }),
      });

      const { data: uploadData, url_download } = await uploadResponse.json();
      if (!url_download || !uploadData.url) return failRequest();


      const formData = new FormData();
      Object.entries(uploadData.fields).forEach(([field, value]) => {
        formData.append(field, value);
      });
      formData.append("file", file);

      const axiosConfig = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );

          // Aquí puedes actualizar tu barra de progreso en el frontend
          setProgressBar(progress);
        },
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
      };

      //@INFO Consumiendo apli de AWS para guardar la imagen
      await axios.post(uploadData.url, formData, axiosConfig);
      setFilePathAws(url_download);
    } catch (error) {
      return failRequest(error)
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      {!!file && progressBar === 0 && (
        <button onClick={handleUpload}>Upload</button>
      )}
      <br />

      {!!errorMessage && <p>{errorMessage}</p>}
      {!!progressBar && <ProgressBar progress={progressBar} />}
      {!!filePathAws && (
        <a href={filePathAws} target="_blank" rel="noopener noreferrer">
          abrir archivo
        </a>
      )}

      <br />
      <RenderFile file={file} />
    </>
  );
}

export default App;
