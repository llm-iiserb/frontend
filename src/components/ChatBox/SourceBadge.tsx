import * as React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type SourceBadgeProps = {
  filename: string;
  page?: number;
  urlPrefix: string;
  icon: React.ReactNode;
  chunk_text?: string;
};

const SourceBadge: React.FC<SourceBadgeProps> = ({
  filename,
  page,
  urlPrefix,
  icon,
  chunk_text,
}) => {
  const [show, setShow] = React.useState(false);
  return (
    <div
      className="SourceBadge"
      onClick={(e) => {
        setShow(!show);
        e.preventDefault();
      }}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="flex pt-2 items-center gap-1">
          <div className="icon">{icon}</div>
          <div className="filename">
            {filename} {page! > 0 && `@ Pg. ${page}`}
          </div>
        </div>
        <span
          className={`transition-all duration-200 ${
            show ? "rotate-180" : "rotate-0"
          }`}
        >
          <MdOutlineKeyboardArrowDown size={24} />
        </span>
      </div>
      <div className={`chunk ${show ? "show" : "hide"}`}>{chunk_text}</div>
    </div>
  );
};

export default SourceBadge;
