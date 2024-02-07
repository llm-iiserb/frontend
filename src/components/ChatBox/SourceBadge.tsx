import { getDownloadURL, getStorage, ref } from "firebase/storage";
import * as React from "react";
import app from "../../firebase";

type SourceBadgeProps = {
  filename: string;
  page?: number;
  urlPrefix: string;
  icon: React.ReactNode;
  chunk_text?: string;
};

function extractFilename(fullPath: string): string | null {
  // Define the regular expression pattern to match the filename
  const pattern: RegExp = /[^\\\/]+(?=[\\\/]*$)/;

  // Use RegExp.prototype.exec to find the filename in the full path
  const match: RegExpExecArray | null = pattern.exec(fullPath);

  if (match) {
    // Return the matched filename
    return match[0];
  } else {
    // If no match found, return null
    return null;
  }
}

const SourceBadge: React.FC<SourceBadgeProps> = ({
  filename,
  // @ts-ignore
  page,
  //urlPrefix,
  icon,
  // @ts-ignore
  chunk_text,
}) => {
  const [url, setUrl] = React.useState("");

  const storage = getStorage(app);
  const sourceRef = ref(storage, `docs/${filename}`);
  getDownloadURL(sourceRef).then((fileUrl) => {
    setUrl(fileUrl);
  });

  return (
    <div className="SourceBadge">
      <a
        href={url}
        target="_blank"
        className="flex justify-between items-center gap-2"
      >
        <div className="flex items-center gap-2">
          <div className="icon">{icon}</div>
          <div className="filename">{extractFilename(filename)}</div>
        </div>
      </a>
    </div>
  );
};

export default SourceBadge;
