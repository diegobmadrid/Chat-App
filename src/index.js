const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const socketIO = require("socket.io")(server);

app.set("port", process.env.PORT || 8001);

// Ejecuta la funcion exportada de conexion ubicada en socket.js
require("./socket")(socketIO);


app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get("port"), () => {
    console.log("Esta escuchando el puerto", app.get("port"));
});