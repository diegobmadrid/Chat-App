module.exports = (io) => {

    let nickNames = [];

    io.on("connection", socket => {
        console.log("Nuevo usuario conectado", socket.id, socket.handshake.headers["x-real-ip"]);
        // Se recibe el mensaje emitido desde el front y se obtienen los valores.
        socket.on("enviar mensaje", (data) => {
            // console.log(data);
            io.sockets.emit("nuevo mensaje", {
                msg: data,
                username: socket.nickname
            });
        });

        socket.on("nuevo usuario", (data, callback) => {
            if (nickNames.indexOf(data) != -1) {
                callback(false);
            } else {
                callback(true);
                socket.nickname = data;
                nickNames.push(socket.nickname);
                io.sockets.emit("nombre usuario", nickNames);
            }
        });

    });



}