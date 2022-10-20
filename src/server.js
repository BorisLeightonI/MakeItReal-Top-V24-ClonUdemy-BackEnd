const express = require("express");
//require("dotenv").config(); /*Solo se usa en Local no en producción*/
const morgan = require('morgan');
const cors = require('cors')
const { connect } = require("./db")
const applicationRoutes = require('./routes')
const { transporter, verify } = require('./utils/mailer')


const app = express();
const port = process.env.PORT || 8080;
connect();
verify(transporter)

app.use(express.json())
app.use(morgan('tiny'))
/* app.use(cors({
  "origin": "https://mir-top-v24-udemy-front-end.vercel.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
})) */
//{origin: 'https://mir-top-v24-udemy-front-end.vercel.app'}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

applicationRoutes(app)

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}!`)
})

/// hola yo soy un comentario para borrar
