const express = require("express");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8000;

const connectToDatabase = require("./src/db");
const matchController = require("./src/controller/match-controller");

const { validateAccessToken } = require("./src/middleware/auth0");
const serializeBigInt = require("./src/middleware/serialize-bigint");
const errorHandler = require("./src/middleware/error-handler");

const boot = async () => {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

app.use(cors());
app.use(serializeBigInt);
app.use(express.json());
app.use("/api/match", validateAccessToken, matchController);
app.use(errorHandler);

boot();
