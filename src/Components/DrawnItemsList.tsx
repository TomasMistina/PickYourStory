import React from "react";
import { DrawnItem } from "../model";
import SingleDrawnItem from "./SingleDrawnItem";
import "./styles.css";

type Props = {
  drawnItems: DrawnItem[];
  setDrawnItems: React.Dispatch<React.SetStateAction<DrawnItem[]>>;
  isDrawnNow: boolean;
};

const DrawnItemsList = ({ drawnItems, setDrawnItems, isDrawnNow }: Props) => {
  return (
    <div className="drawn__item__list__container">
      <span className="hat__heading">Vytiahnuté slová</span>
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
