import { useState } from "react";
import { HiMiniClipboardDocumentList, HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import "../styles.css";

type Props ={
    accessCode: string;
}

const CopyLabel = ({accessCode}: Props) =>{
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset after 1.5 sec
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="copy__code">
      <label>Kód prístupu: </label>
      <span>{accessCode} </span>
      <button className="copy__button" onClick={handleCopy}>
        {copied ? <HiMiniClipboardDocumentCheck /> : <HiMiniClipboardDocumentList />}
      </button>
    </div>
  );
}

export default CopyLabel;