const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json())
app.use(express.static("public"));
const upload = multer();

const BUCKET_NAME = 'pruebanode'


const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-east-2',
});


app.post('/api/validate-upload', (req, res) => {
  // Perform validation logic here
  console.log('entranding');
  // For simplicity, we assume validation is successful
  res.json({ valid: true });
});




app.post('/api/upload', async (req, res) => {
  const { key } = req.body;

  const params = {
    Bucket: BUCKET_NAME,
    Conditions: [
      ["content-length-range", 0, 1000000000],
    ],
    Fields: {
      key
    },
    Expires: 30 * 60
  };

  const response  = await s3.createPresignedPost(params)
  res.json({data: response});
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});