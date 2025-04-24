// src/App.jsx
import { useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import Message from "./components/Message";
import { getUserId } from "./utils/user";

function App() {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = getUserId();

  useEffect(() => {
    if (!socket) return;

    socket.on("chat:message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat:message"); // Limpieza por si acaso
    };
  }, [socket]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const msg = {
        content: input,
        sender: userId,
      };
      socket.emit("chat:message", msg);
      setInput("");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            content={msg.content}
            isOwn={msg.sender === userId}
          />
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "auto" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;
