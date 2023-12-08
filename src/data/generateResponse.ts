import axios from "axios";

const generateResponse = async (question: string) => {
  // const port = 8100;
  const url = "https://deciding-seahorse-discrete.ngrok-free.app";
  // const url = "http://localhost:8100";
  const res = await axios.get(`${url}/llm`, {
    params: { question },
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
