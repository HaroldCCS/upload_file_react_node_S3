import { memo } from "react";

const RenderFile = ({ file }) => {

  return (
    <div>
      {file && (
        <div>
          {file.type.startsWith('image/') && (
            <img src={URL.createObjectURL(file)} alt="Contenido seleccionado" style={{ maxWidth: '100%' }} />
          )}

          {file.type.startsWith('video/') && (
            <video width="320" height="240" controls>
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
