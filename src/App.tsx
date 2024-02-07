import React, { useEffect, useState } from "react";
import "./App.css";
import ChatArea from "./components/ChatArea";
import ChatPrompt from "./components/ChatPrompt";
import app, { auth } from "./firebase";

import NoAuth from "./components/NoAuth";
import Header from "./components/Header";
import useMessageStore from "./data/messages";
import useServerStatus from "./data/health";
// import isServerActive from "./utils/health";

import ServerError from "./components/ServerError";
// import { HttpStatusCode } from "axios";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

const App: React.FC = () => {
  const [showUI, setShowUI] = useState(false);
  const resetMessages = useMessageStore(({ reset }) => reset);
  const serverStatus = useServerStatus();

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

    const unsub = onSnapshot(
      doc(getFirestore(app), "server", "status"),
      (doc) => {
        console.log("Current data: ", doc.data());
        serverStatus.setActive(doc.data()?.active || false);
      }
    );

    console.log(auth.currentUser);

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <div className="App">
        {showUI ? (
          <>
            <Header />

            {serverStatus.active ? (
              <>
                <ChatArea />
                <div className="items-end">
                  <ChatPrompt />
                  <div className="disclaimer">
                    IISERB GPT can make mistakes, consider checking important
                    info before making decisions.
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center grow">
                  <ServerError />
                </div>
              </>
            )}
          </>
        ) : (
          <NoAuth />
        )}
      </div>
    </>
  );
};

export default App;
