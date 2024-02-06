import axios from "axios";
import { createEndpoint } from "../data";

const isServerActive = () => {
  return axios.get(createEndpoint("health"), {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
    withCredentials: true,
  });
};

export default isServerActive;
