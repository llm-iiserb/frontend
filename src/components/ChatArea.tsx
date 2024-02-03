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
        <div className="text-gray-500">
          All answers are sourced from:
          {/* create a list CSS styled with bullet points*/}
          <ul style={{ listStyleType: "square", marginLeft: "1rem" }}>
            <li> Student Manual (DoSA Office, 2023) </li>
            <li> Academic Manual (DoAA Office, 2020) </li>
            <li> PG Manual (DoAA Office, 2020) </li>
            <li> UG Manual (DoAA Office, 2020) </li>
            <li> Course Contents of Natural Sciences (DoAA Office, 2013) </li>
            <li> Internet Connectivity FAQ (Computer Centre, 2023) </li>
            <li> Internet Connectivity Manual (Computer Centre, 2023) </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
