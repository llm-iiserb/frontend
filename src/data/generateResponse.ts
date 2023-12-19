import axios from "axios";
import { auth } from "../firebase";
import { getUserType } from "../utils/userValidation";
import { Message, MessageType } from "./messages";

export const generatePrompt = (
  context: Message[],
  question: string,
  nLast: number
): string => {
  const contextString = context
    .slice(-nLast * 2)
    // .map(
    //   (v) =>
    //     `### Prev ${
    //       v.msgType === MessageType.USER ? "Question(use as context)" : "Answer"
    //     }:\n${v.content}`
    // )
    .map((v) => `### Q:\n${v.msgType === MessageType.USER ? v.content : ""}`)
    .join("\n\n");
  const prompt = `${contextString}\n\n### New Query(generate answer): ${question}`;
  return prompt;
};

const generateResponse = async (question: string, messages: Message[]) => {
  const url = "https://deciding-seahorse-discrete.ngrok-free.app";
  const { displayName: name, email } = auth.currentUser!;
  const res = await axios.get(`${url}/llm`, {
    params: {
      question,
      user_type: getUserType(name!, email!),
      prev_question: messages.at(-2)?.content || "",
      prev_answer: messages.at(-1)?.content || "",
    },
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  const { response, sources } = await res.data;
  console.log({ response, sources });
  return { response, sources };
};

export default generateResponse;
