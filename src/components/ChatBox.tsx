import * as React from "react";
import { MessageType } from "../data/messages";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type ChatBoxProps = {
  type: MessageType;
  content: string;
};

const ChatBox: React.FC<ChatBoxProps> = ({ type, content }) => {
  return (
    <div className={`ChatBox ${type.toLowerCase()}`}>
      <div className="content">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content
            ? content.replace(/\\n/gi, "\n").replace(/\n/gi, "<br/>")
            : "Loading..."}
        </Markdown>
      </div>
    </div>
  );
};

export default ChatBox;
