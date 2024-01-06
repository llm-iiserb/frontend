import * as React from "react";
import { MessageType, ResponseSource } from "../../data/messages";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./index.css";
import SourceBadge from "./SourceBadge";
import {
  BsFileFill,
  BsFilePdfFill,
  BsMarkdownFill,
  BsExclamationTriangleFill,
} from "react-icons/bs";
import Feedback from "./Feedback";

type ChatBoxProps = {
  id?: string;
  type: MessageType;
  content: string;
  sources?: ResponseSource[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ type, content, sources, id }) => {
  return (
    <div className={`ChatBox ${type.toLowerCase()}`}>
      <div className="content">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </Markdown>
      </div>
      {type === MessageType.AGENT && (
        <>
          <div className="text-dark-1-800 p-2 md:p-4 rounded-lg text-sm bg-dark-1-400 flex items-center gap-2 md:gap-4">
            <span className="text-2xl md:text-3xl text-secondary-2-400 drop-shadow-md">
              <BsExclamationTriangleFill />
            </span>
            <span>
              Answers may contain incorrect information, please refer to
              following documents before making important decisions.
            </span>
          </div>
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
                  <li key={source.id}>
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
          <Feedback chatId={id || ""} />
        </>
      )}
    </div>
  );
};

export default ChatBox;
