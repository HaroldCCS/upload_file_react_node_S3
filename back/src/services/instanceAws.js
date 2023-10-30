const AWS = require("aws-sdk");

//Singleton de instancia aws
class InstanceAws {
  static instance;
  // static instance: InstanceAws
  s3;

  // clase privada (poner privata en TS)
  constructor() {
    this.s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      signatureVersion: "v4",
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });
  }

  static async getInstance() {
    if (!InstanceAws.instance || !InstanceAws.instance.s3) {
      InstanceAws.instance = new InstanceAws();
    } else {

      try {
        //@INFO Validar si la conexion con aws sigue activa
        await InstanceAws.instance.s3.listBuckets().promise();
      } catch (error) {
        // Manejar el error o reinicializar la instancia si es necesario
        InstanceAws.instance = new InstanceAws();
      }
    }

    return InstanceAws.instance;
  }
}

module.exports = InstanceAws;
