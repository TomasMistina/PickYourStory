import React from "react";
import "./CompactWordDisplay.css";
import { useIsMobile } from "../../mobile/useIsMobile";

const CompactWordItem = ({ text } : { text: string }) => {
  const isMobile = useIsMobile();
  return <span className= {isMobile ? "mobile__tag__style" : "tag__style"}>{ text }</span>;
};

export default CompactWordItem;