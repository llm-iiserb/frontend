import * as React from "react";
import ChatBox from "./ChatBox";
import useMessageStore from "../data/messages";

import { AgentMessage } from "../data/messages";

const ChatArea: React.FC = () => {
  const messages = useMessageStore(({ messages }) => messages);

  return (
    <div className="ChatArea">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <ChatBox
            key={index}
            type={message.msgType}
            content={message.content}
            sources={(message as AgentMessage).sources || []}
          />
        ))
      ) : (
        <div className="text-gray-500">The chat history appears here</div>
      )}
    </div>
  );
};

export default ChatArea;
