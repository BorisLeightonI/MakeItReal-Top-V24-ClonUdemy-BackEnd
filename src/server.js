const express = require("express");
require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors')
const { connect } = require("./db")
const userRoute = require('../api/user/user.routes')
const studentRoute = require('../api/student/student.routes')

const app = express();
const port = process.env.PORT || 8080;
connect();

app.use(express.json(), morgan('tiny'),cors())

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port} from server.js!`)
})

/* endpoints / routes */
app.use("/user", userRoute)
app.use('/student', studentRoute)
