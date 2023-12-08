import * as React from "react";
import useMessageStore from "../data/messages";
import useQueryState, { QueryState } from "../data/query";
import { BiSolidSend } from "react-icons/bi";
import { RiLoader5Fill } from "react-icons/ri";
import generateResponse from "../data/generateResponse";

const ChatPrompt: React.FC = () => {
  const messageState = useMessageStore();
  const queryState = useQueryState();

  const handleSubmit = async () => {
    messageState.addQuestion();
    const question = messageState.currentPrompt;
    messageState.updatePrompt("");
    queryState.setLoading();
    const answer = await generateResponse(question);
    queryState.setSuccess();
    messageState.addResponse(answer);
  };

  return (
    <div className="ChatPrompt">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <div className="question">
          <input
            type="text"
            value={messageState.currentPrompt}
            onChange={(e) => {
              messageState.updatePrompt(e.target.value);
            }}
            placeholder="Type a message..."
          />
        </div>
        <div className="btn">
          <button
            type="submit"
            disabled={queryState.qState === QueryState.LOAD}
          >
            {queryState.qState === QueryState.LOAD ? (
              <div className="animate-spin">
                <RiLoader5Fill size={32} />
              </div>
            ) : (
              <BiSolidSend size={32} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPrompt;
