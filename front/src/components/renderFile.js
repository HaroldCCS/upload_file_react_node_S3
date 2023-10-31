import { memo } from "react";

const RenderFile = ({ file }) => {

  return (
    <div>
      {file && (
        <div>
          {file.type.startsWith('image/') && (
            <img src={URL.createObjectURL(file)} alt="Contenido seleccionado"  />
          )}

          {file.type.startsWith('video/') && (
            <video width="auto" height="auto" controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Tu navegador no soporta el elemento de video.
            </video>
          )}

          {file.type === 'application/pdf' && (
            <iframe title="Contenido seleccionado" src={URL.createObjectURL(file)} width="600" height="400" />
          )}
        </div>
      )}
    </div>
  );
};


export default memo(RenderFile);
