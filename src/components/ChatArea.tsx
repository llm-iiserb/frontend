import * as React from "react";
import ChatBox from "./ChatBox";
import useMessageStore from "../data/messages";

import { AgentMessage } from "../data/messages";

const ChatArea: React.FC = () => {
  const messages = useMessageStore(({ messages }) => messages);
  const myRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    myRef.current!.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="ChatArea" ref={myRef}>
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <ChatBox
              key={message.id}
              type={message.msgType}
              content={message.content}
              sources={(message as AgentMessage).sources || []}
              
              id={message.id}
            />
          ))}
          <div ref={myRef}></div>
        </>
      ) : (
        <div className="text-gray-500">The chat history appears here</div>
      )}
    </div>
  );
};

export default ChatArea;
