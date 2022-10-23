const express = require("express");
require("dotenv").config(); /*Solo se usa en Local no en producción*/
const morgan = require('morgan');
const cors = require('cors')
const { connect } = require("./db")
const applicationRoutes = require('./routes')
const { transporter, verify } = require('./utils/mailer')


const app = express();
const port = process.env.PORT || 8080;
connect();

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

/* app.use(cors({
  "origin": "https://mir-top-v24-udemy-front-end.vercel.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
})) */
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('tiny'))
verify(transporter)

applicationRoutes(app)

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}!`)
})

// intento dos
