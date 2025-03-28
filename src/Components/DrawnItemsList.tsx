import React from "react";
import { DrawnItem, Item } from "../model";
import SingleDrawnItem from "./SingleDrawnItem";
import "./styles.css";

type Props = {
  drawnItems: Item[];
  setDrawnItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isDrawnNow: boolean;
};

const DrawnItemsList = ({ drawnItems, setDrawnItems, isDrawnNow }: Props) => {
  return (
    <div className="drawn__item__list__container">
      <span className="hat__heading">Vytiahnuté papieriky</span>
      <div className={isDrawnNow ? "items" : "items__drawn"}>
        {drawnItems.map((item) => (
          <SingleDrawnItem
            drawnItem={item}
            key={item.id}
            drawnItems={drawnItems}
            setDrawnItems={setDrawnItems}
            isDrawnNow={isDrawnNow}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawnItemsList;
