import axios from "axios";
import { auth } from "../firebase";
import { getUserType } from "../utils/userValidation";
import { Message, ResponseSource } from "./messages";

const generateResponse = async (
  question: string,
  messages: Message[]
): Promise<{ chatId: string; response: string; sources: ResponseSource[] }> => {
  //const url = "http://203.18.51.89:5000";
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
  const { chat_id: chatId, response, sources } = await res.data;
  console.table({ chatId, response, sources });
  console.log("sources", sources);
  return { chatId, response, sources };
};

export default generateResponse;
