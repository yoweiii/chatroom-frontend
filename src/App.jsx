import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch("https://chatroom-backend-sjzj.onrender.com/chat", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages(data.history);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>React + FastAPI 聊天室</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role === "user" ? "你" : "AI"}：</b> {m.msg}
          </div>
        ))}
      </div>

      <input
        style={{ width: "70%", padding: 8 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入訊息..."
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 10 }}>
        送出
      </button>
    </div>
  );
}

export default App;
