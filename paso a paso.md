# paso a paso

## express js
- create package.json```npm init -y```
- instalar express ```npm i express```
- crear carpeta src con index.js
- se requiere express```const express = require("express");```
- se instancia express ```const app = express()```
- en escript ```"start": "node src/index.js"```
- nodemon como devDependencies ```npm i nodemon -D```
- agregar a devDependencies ```"dev": "nodemon src/index.js"```

## first CRUD

para id randoms ```npm i uuid-random```

## arquitectura

instalar mongoose ```npm i mongoose```

instalar dotenv para variables de entorno ```npm i dotenv  -D```

instalar morgan para leer errores en consola ```npm i morgan --save```

instalar un paquete para el hash de la clave como bycript.js ```npm install bcryptjs```

instalar cross origin resource sharing CORS ```npm i cors```

instalar para mongoose paginate v2 ```npm install mongoose-paginate-v2```

## Documentación con swagger
- npm i swagger-ui-express swagger

## Autenticación  / auth

no ide sino en el Header un token del usuario

bccrypt y jsonweb token 

```npm i bcrypt jsonwebtoken```

en src crear carpeta utils con auth.js 