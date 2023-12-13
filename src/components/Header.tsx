import * as React from "react";
import { GoSignOut } from "react-icons/go";
import Logo from "../../public/android/android-launchericon-48-48.png";

import "./Header.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header: React.FC = () => {
  return (
    <header className="Header">
      <div className="brand">
        <span className="icon">
          <img src={Logo} alt="logo" />
        </span>
        <span className="name">IISERB GPT</span>
      </div>
      <nav>
        {auth.currentUser && (
          <>
            <span className="user__name">{auth.currentUser.displayName}</span>
            <img
              className="user__img"
              src={auth.currentUser.photoURL || ""}
              alt={auth.currentUser.displayName || ""}
            />
          </>
        )}
        <button onClick={() => signOut(auth)} className="btn__logout">
          <GoSignOut size={24} />
          <div className="popup">Logout</div>
        </button>
      </nav>
    </header>
  );
};

export default Header;
