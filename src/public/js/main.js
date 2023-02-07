
$(document).ready(() => {
    const socket = io();
    let nick = "";

    const messageForm = $("#message-form");
    const messageInput = $("#chat-message");
    const messagesBox = $("#chat-box");

    const nickForm = $("#nickname-form");
    const nickError = $("#nickname-error");
    const nickName = $("#nickname-name");

    const userNames = $("#chat-users");
    // Eventos de el DOM.

    messageForm.submit((e) => {
        e.preventDefault();
        socket.emit("enviar mensaje", messageInput.val());
        messageInput.val("");
    });

    // Se obtiene la respuesta del nuevo mensaje desde el servidor.

    socket.on("nuevo mensaje", (data) => {
        let color = "F4F4F4";
        if(nick == data.username){
            color = "#9FF4C5";
        }
        messagesBox.append(`<div class="msg-area mb-2" style="background-color: ${color}"><b>${data.username}</b><p class="msg">${data.msg}</p></div>`)
    });

    // Se envia nuevo usuario logeado
    nickForm.submit((e) => {
        e.preventDefault();
        socket.emit("nuevo usuario", nickName.val(), (data) => {
            if (data) {
                nick = nickName.val();
                $("#nickname-wrap").hide();
                $("#content-wrap").show();
            }else{
                nickError.html("<div class='alert alert-danger'>El usuario ya existe</div>")
            }
            nickName.val("");
        })
    });

    // Obtener los usuarios conectados.

    socket.on("nombre usuario", data => {
        let html = "";
        let color = "";
        let salir = "";
        for(let i = 0; i < data.length; i++){
            if(nick == data[i]){
                color = "#027F43";
                salir = `<a class="enlace-salir" href="/">Salir</a>`;
            }else{
                color = "#000";
                salir = "";
            }
            html += `<p style="color: ${color}">${data[i]} ${salir}</p>`;
        }
        userNames.html(html);
    });


})



