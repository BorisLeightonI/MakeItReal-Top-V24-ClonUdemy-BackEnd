const express = require("express");

const app = express();

const port = 8080;

app.get("/home", (req, res) =>{
  //const{ body } = req
  res.send("<h1>udemy backend hi from index.js app.get<h1>")
  console.log(res)
});

app.get("/students", (req, res) => {
  res.json([
    {
      name: "NombreEjemplo-1",
      age:"1",
    },
    {
      name: "NombreEjemplo-2",
      age:"2",
    }
  ])
  console.log("students is working")
})


app.listen(port, ()=> {
  console.log(`Succes running at http://localhost:${port}`)
});
