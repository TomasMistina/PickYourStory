import React from "react";
import { DrawnItem, Item } from "../model";
import SingleDrawnItem from "./SingleDrawnItem";
import "./styles.css";
import { useIsMobile } from "../mobile/useIsMobile";

type Props = {
  drawnItems: Item[];
  setDrawnItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isDrawnNow: boolean;
};

const DrawnItemsList = ({ drawnItems, setDrawnItems, isDrawnNow }: Props) => {
  const isMobile = useIsMobile();
  return (
    <div className="drawn__item__list__container">
      <span className={isMobile? "mobile__hat__heading" : "hat__heading"}>Vytiahnuté papieriky</span>
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
