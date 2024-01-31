import axios, { HttpStatusCode } from "axios";
import { createEndpoint } from "../data";

const isServerActive = async () => {
  const health = await axios.get(createEndpoint("health"), {
    headers: {
      "ngrok-skip-browser-warning": true,
    },
    withCredentials: true,
  });
  if (health.status === HttpStatusCode.Ok) {
    return true;
  } else {
    return false;
  }
};

export default isServerActive;
