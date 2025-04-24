// sockets/chat.js
export default function chatSocketHandler(io, socket) {
    socket.on('front:chat:message', (msg) => {
      console.log(`📨 Mensaje recibido: ${msg}`);
      io.emit('server:chat:message', msg); // Reenvía a todos
    });
  }
  