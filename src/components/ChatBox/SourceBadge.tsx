import * as React from "react";

type SourceBadgeProps = {
  filename: string;
  page?: number;
  urlPrefix: string;
  icon: React.ReactNode;
};

const SourceBadge: React.FC<SourceBadgeProps> = ({
  filename,
  page,
  urlPrefix,
  icon,
}) => {
  return (
    <a
      className="SourceBadge"
      href={`${urlPrefix}/${filename}`}
      target="_blank"
    >
      <div className="icon">{icon}</div>
      <div className="filename">
        {filename} {page && `@ Pg. ${page}`}
      </div>
    </a>
  );
};

export default SourceBadge;
