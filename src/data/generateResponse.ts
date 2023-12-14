import axios from "axios";
import { auth } from "../firebase";
import { getUserType } from "../utils/userValidation";

const generateResponse = async (question: string) => {
  const url = "https://deciding-seahorse-discrete.ngrok-free.app";
  const { displayName: name, email } = auth.currentUser!;
  const res = await axios.get(`${url}/llm`, {
    params: { question, user_type: getUserType(name!, email!) },
    withCredentials: true,
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  });
  const ans = await res.data;
  console.log(ans);
  return ans["response"];
};

export default generateResponse;
