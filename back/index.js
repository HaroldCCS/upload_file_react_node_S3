//--- Librerias
const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
//--- Librerias

//--- Servicios
const uploadFile = require("./src/services/uploadFile");
//--- Servicios

//--- App config
const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const upload = multer();
//--- App config

//--- Endpoints
app.post("/api/upload", async (req, res) => res.json(await uploadFile(req.body)));
//--- Endpoints

app.listen(port, () => console.log(`Server is running on port ${port}`));
