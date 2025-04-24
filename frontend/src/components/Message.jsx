// src/components/Message.jsx
import "./Message.css";

const Message = ({ content, isOwn }) => {
  return (
    <div className={`message ${isOwn ? "own" : "other"}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
