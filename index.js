const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//traemos la funcion routerApi donde estan todas las rutas de los componentes
const routerApi = require("./src/routes/router");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//le pasamos a la funcion, la peticion realizada desde el servidor
routerApi(app);

app.listen(3001, () => {
  console.log("api in 3001");
});
