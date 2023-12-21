import axios from "axios";
import { auth } from "../firebase";
import { getUserType } from "../utils/userValidation";
import { Message, ResponseSource } from "./messages";

const generateResponse = async (
  question: string,
  messages: Message[]
): Promise<{ response: string; sources: ResponseSource[] }> => {
  const url = "https://deciding-seahorse-discrete.ngrok-free.app";
  const { displayName: name, email } = auth.currentUser!;
  var history: { question: string; answer: string }[] = [];
  for (var i = 0; i < messages.length; i++) {
    history = [
      ...history,
      {
        question: messages[i].content,
        answer: messages[++i].content,
      },
    ];
  }

  const res = await axios.post(
    `${url}/llm`,
    {
      question,
      user_type: getUserType(name!, email!),
      history,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
      withCredentials: true,
    }
  );
  const { response, sources } = await res.data;
  console.table({ response, sources });
  return { response, sources };
};

export default generateResponse;
