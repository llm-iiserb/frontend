import { useState } from "react";
import "./App.css";
import ChatArea from "./components/ChatArea";
import ChatPrompt from "./components/ChatPrompt";

function App() {
  return (
    <>
      <div className="App">
        <header>IISER GPT</header>
        <ChatArea />
        <div className="items-end">
          <ChatPrompt />
        </div>
      </div>
    </>
  );
}

export default App;
