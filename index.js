/* eslint-disable no-undef */
const express = require("express");
const routerAPI = require("./routes");
const { logErrors, errorHandler } = require("./middelwares/error.handler");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worldss!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

routerAPI(app);

app.use(logErrors);
app.use(errorHandler);
