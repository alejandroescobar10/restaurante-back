const routerApi = require('./routes')
const express = require('express');//Se agrega al index de las rutas
const {urlencoded, json} = require('express');
const cors = require('cors');
const {connectDB} = require('./db/dbmongo.js');
require('dotenv').config(); // Asegúrate de requerir dotenv si usas un archivo .env localmente

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors());

const rutas = express.Router();//Se agrega al index de las rutas
routerApi(rutas); 
app.use('/v1', rutas);//Se agrega al index de las rutas
const PORT =process.env.PORT || 4000;
app.get("/", (req, res) => {
    const htmlResponse = `
      <html>
        <head>
          <title>NodeJs y Express en Vercel</title>
        </head>
        <body>
          <h1>Soy un proyecto Back end en vercel</h1>
        </body>
      </html>
    `;
    res.send(htmlResponse);
  });

connectDB();
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
