import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeEuduMbEOljzZ1jX9M98AdDrCJQZVoU8",
  authDomain: "iiserllm.firebaseapp.com",
  projectId: "iiserllm",
  storageBucket: "iiserllm.appspot.com",
  messagingSenderId: "889823312756",
  appId: "1:889823312756:web:bd3db5befbaab992e04a21",
  measurementId: "G-5V2V7EP1GK",
};

// Firebase initialization
const app = initializeApp(firebaseConfig);

// Firebase analytics
export const analytics = getAnalytics(app);
setAnalyticsCollectionEnabled(analytics, true);

// Firebase auth
export const auth = getAuth(app);

export default app;
