import * as React from "react";
import { MessageType, ResponseSource } from "../../data/messages";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./index.css";
import SourceBadge from "./SourceBadge";
import { BsFileFill, BsFilePdfFill, BsMarkdownFill } from "react-icons/bs";

type ChatBoxProps = {
  type: MessageType;
  content: string;
  sources?: ResponseSource[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ type, content, sources }) => {
  return (
    <div className={`ChatBox ${type.toLowerCase()}`}>
      <div className="content">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content
            ? content.replace(/\\n/gi, "\n").replace(/\n/gi, "<br/>")
            : "Loading..."}
        </Markdown>
      </div>
      {type === MessageType.AGENT && (
        <div className="sources">
          <div className="title">Sources</div>
          <ul className="badges">
            {sources?.map((source) => {
              const icon = /^\S+\/*\.pdf$/gm.test(source?.source) ? (
                <div className="text-secondary-2-300">
                  <BsFilePdfFill />
                </div>
              ) : /^\S+\/*\.md$/gm.test(source?.source) ? (
                <div className="text-primary-2-300">
                  <BsMarkdownFill />
                </div>
              ) : (
                <div className="text-light-2">
                  <BsFileFill />
                </div>
              );
              return (
                <li key={`${source?.source}${source?.page}`}>
                  <SourceBadge
                    filename={source?.source}
                    page={source?.page}
                    urlPrefix="https://github.com/llm-iiserb/docs/blob/main"
                    icon={icon}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
