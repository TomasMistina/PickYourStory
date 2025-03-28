import React from "react";
import { DrawnItem, Item } from "../model";
import { AiFillDelete } from "react-icons/ai";
import "./styles.css";

type Props = {
  drawnItem: Item;
  drawnItems: Item[];
  setDrawnItems: React.Dispatch<React.SetStateAction<Item[]>>;
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
        <span className="items__single--text">{drawnItem.value}</span>
    </form>
  );
};

export default SingleDrawnItem;
