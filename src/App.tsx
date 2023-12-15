import { useEffect, useState } from "react";
import "./App.css";
import ChatArea from "./components/ChatArea";
import ChatPrompt from "./components/ChatPrompt";
import { auth } from "./firebase";

import NoAuth from "./components/NoAuth";
import Header from "./components/Header";
import useMessageStore from "./data/messages";

function App() {
  const [showUI, setShowUI] = useState(false);
  const resetMessages = useMessageStore(({ reset }) => reset);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`Welcome, ${user.displayName} [${user.email}]`);
        resetMessages();
        setShowUI(true);
      } else {
        console.log("No user detected");
        setShowUI(false);
      }
    });

    console.log(auth.currentUser);
  }, []);

  return (
    <>
      <div className="App">
        {showUI ? (
          <>
            <Header />
            <ChatArea />
            <div className="items-end">
              <ChatPrompt />
              <div className="disclaimer">
                IISERB GPT can make mistakes, consider checking important info
              </div>
            </div>
          </>
        ) : (
          <NoAuth />
        )}
      </div>
    </>
  );
}

export default App;
