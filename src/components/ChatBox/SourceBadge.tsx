import * as React from "react";

type SourceBadgeProps = {
  filename: string;
  page?: number;
  urlPrefix: string;
  icon: React.ReactNode;
  chunk_text?: string;
};

const SourceBadge: React.FC<SourceBadgeProps> = ({
  filename,
  // @ts-ignore
  page,
  //urlPrefix,
  icon,
  // @ts-ignore
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
        <div className="flex items-center gap-1">
          <div className="icon">{icon}</div>
          <div className="filename">{filename}</div>
        </div>
      </div>
    </div>
  );
};

export default SourceBadge;
