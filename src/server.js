require("dotenv").config()
const express = require("express");
const { connect } = require("./db")

const app = express();
const port = process.env.PORT || 8080;
connect();

app.use(express.json())

app.listen(port, () => {
  console.log(`✅Server listening on port ${port} from server.js`)
})
