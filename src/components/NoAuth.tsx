import * as React from "react";
import GoogleIcon from "../../public/icons/google.svg";
import "./NoAuth.css";
import Logo from "../../public/android/android-launchericon-96-96.png";
import { googleAuth } from "../firebase/auth";

const NoAuth: React.FC = () => {
  return (
    <div className="NoAuth">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="IISERB GPT Logo" />
        <div className="title">Welcome to IISERB GPT!</div>
      </div>
      <button onClick={googleAuth} className="btn__no_auth">
        <span className="icon">
          <img src={GoogleIcon} alt="Google Icon" />
        </span>
        <span className="text">Sign in with Google</span>
      </button>
    </div>
  );
};

export default NoAuth;
