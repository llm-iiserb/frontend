import * as React from "react";
import useMessageStore from "../data/messages";
import useQueryState, { QueryState } from "../data/query";
import { BiSolidSend } from "react-icons/bi";
import { RiLoader5Fill } from "react-icons/ri";
import generateResponse from "../data/generateResponse";
import { nanoid } from "nanoid";

const randomQuestions = [
  "Hostel leave procedure",
  "FAAC Scheme for conference travel grant",
  "Hostel Rules",
  "How many Overload Courses can I take?",
  "Substituting failed courses",
  "Counselling session booking",
  "Internal Complaints Committee",
  "SAC Constitution",
  "Registering MAC address",
  "How to connect to IISER VPN"
];

const ChatPrompt: React.FC = () => {
  const messageState = useMessageStore();
  const queryState = useQueryState();

  const handleSubmit = async () => {
    queryState.setLoading();
    // const prompt = generatePrompt(
    //   messageState.messages,
    //   messageState.currentPrompt,
    //   2
    // );
    const prompt = messageState.currentPrompt;
    messageState.addQuestion();
    messageState.updatePrompt("");
    console.log("Prompt:\n", prompt);
    const { chatId, response, sources } = await generateResponse(
      prompt,
      messageState.messages
    );
    queryState.setSuccess();
    messageState.addResponse(
      chatId,
      response,
      sources.map((source) => ({ id: nanoid(7), ...source }))
    );
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
            placeholder={`Try asking about '${
              randomQuestions[
                Math.floor(randomQuestions.length * Math.random())
              ]
            }'`}
          />
        </div>
        <div className="btn">
          <button
            type="submit"
            disabled={
              queryState.qState === QueryState.LOAD ||
              messageState.currentPrompt.length === 0
            }
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
