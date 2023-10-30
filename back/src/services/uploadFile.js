//--- Librerias
const uuid = require("uuid");
//--- Librerias


//--- Servicios
const InstanceAws = require("./instanceAws");
//--- Servicios


const default_conditions = [
  ["content-length-range", 0, 1000000000], //tamano del archivo
]


async function uploadFile({ folder, contentType }) {
  //Bucket en el que se va a guardar el archivo
  const bucket_name = process.env.BUCKET_NAME

  //Nombre unico del archivo como se va a guardar
  const file_name = uuid.v4();

  //Path donde se va a almacenar el archivo (carpeta y nombre del archivo)
  const file_path = `${folder}/${file_name}`;


  const params = {
    Bucket: bucket_name,
    Conditions: default_conditions,
    Fields: {
      'Content-Type': contentType,
      acl: "public-read",
      key: file_path
    },
    Expires: 30 * 60
  };

  const instance_aws = await InstanceAws.getInstance()
  const response  = instance_aws.s3.createPresignedPost(params);

  return {
    data: response,
    url_download: `https://${bucket_name}.s3.${process.env.region}.amazonaws.com/${file_path}`
  }
}

module.exports = uploadFile