import * as React from "react";
import { GoSignOut } from "react-icons/go";
import Logo from "../../public/android/android-launchericon-48-48.png";

import "./Header.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { UserType, getUserType } from "../utils/userValidation";
import { PiChalkboardTeacherFill, PiStudentFill } from "react-icons/pi";
// import { BsPersonFill } from "react-icons/bs";

const Header: React.FC = () => {
  const userIcons: { [key in UserType]: React.ReactNode } = {
    student: <PiStudentFill />,
    faculty: <PiChalkboardTeacherFill />,
    // external: <BsPersonFill />,
  };

  return (
    <header className="Header">
      <div className="brand">
        <span className="icon">
          <img src={Logo} alt="logo" />
        </span>
        <span className="name">Student Search Assistant</span>
      </div>
      <nav>
        {auth.currentUser && (
          <>
            <span className="user__name">{auth.currentUser.displayName}</span>
            <span className="user__type">
              {
                userIcons[
                  getUserType(
                    auth.currentUser.displayName!,
                    auth.currentUser.email!
                  )
                ]
              }
            </span>
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
