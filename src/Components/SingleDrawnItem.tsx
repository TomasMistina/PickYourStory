import React from "react";
import { DrawnItem } from "../model";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";

type Props = {
  drawnItem: DrawnItem;
  drawnItems: DrawnItem[];
  setDrawnItems: React.Dispatch<React.SetStateAction<DrawnItem[]>>;
  isDrawnNow: boolean;
};

const SingleDrawnItem = ({
  drawnItem,
  drawnItems,
  setDrawnItems,
  isDrawnNow,
}: Props) => {

  const handleDelete = (id: string) => {
    setDrawnItems(drawnItems.filter((item) => item.id !== id));
  };

  return isDrawnNow ? (
    <form className="items__single">
      <span className="items__single--text">{drawnItem.value}</span>
      <div>
        <span className="icon" onClick={() => handleDelete(drawnItem.id)}>
          <AiFillDelete />
        </span>
      </div>
    </form>
  ) : (
    <form className="items__single__drawn">
      {drawnItem.isDone ? (
        <s className="items__single--text">{drawnItem.value}</s>
      ) : (
        <span className="items__single--text">{drawnItem.value}</span>
      )}
    </form>
  );
};

export default SingleDrawnItem;
