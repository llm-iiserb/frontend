import * as React from "react";
import { BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import app from "../../firebase";

type FeedbackProps = {
  chatId: string;
};

const Feedback: React.FC<FeedbackProps> = ({ chatId }) => {
  const db = getFirestore(app);
  const handleClick = (feedback: number) => {
    const chatRef = doc(db, "chats", chatId);
    updateDoc(chatRef, { feedback }).then(() => {
      setFeedback(feedback);
    });
  };
  const [feedback, setFeedback] = React.useState<number>(0);

  return (
    <div className="Feedback">
      <ul>
        <li>
          <button
            id="dope"
            className={feedback === 1 ? "positive" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleClick(1);
            }}
          >
            <BsHandThumbsUpFill size="18" />
          </button>
        </li>
        <li>
          <button
            id="nope"
            className={feedback === -1 ? "negative" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleClick(-1);
            }}
          >
            <BsHandThumbsDownFill size="18" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Feedback;
