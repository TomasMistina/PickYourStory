import { useState } from "react";
import { HiMiniClipboardDocumentList, HiMiniClipboardDocumentCheck } from "react-icons/hi2";

type Props ={
    accessCode: string;
}

const CopyLabel = ({accessCode}: Props) =>{
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 30000); // Reset after 1.5 sec
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div>
      <span>{accessCode}</span>
      <button onClick={handleCopy}>
        {copied ? <HiMiniClipboardDocumentCheck /> : <HiMiniClipboardDocumentList />}
      </button>
    </div>
  );
}

export default CopyLabel;