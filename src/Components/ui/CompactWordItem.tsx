import React from "react";
import "./CompactWordDisplay.css";

const CompactWordItem = ({ text } : { text: string }) => {
  return <span className="tag__style">{ text }</span>;
};

export default CompactWordItem;