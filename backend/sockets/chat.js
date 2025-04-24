// sockets/chat.js
export default function chatSocketHandler(io, socket) {
    socket.on('chat:message', (msg) => {
      console.log(`📨 Mensaje recibido: ${msg}`);
      io.emit('chat:message', msg); // Reenvía a todos
    });
  }
  