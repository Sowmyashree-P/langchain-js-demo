const express = require("express");
//import express from "express";
const bodyParser = require("body-parser");
//import bodyParser from "body-parser";
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors())
const port = 3000;

const trainBot = require("./trainBot");
const getAnswer = require("./getAnswer");

app.use(bodyParser.json());
app.get("/train-bot", trainBot);
app.post("/get-answer", getAnswer);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
