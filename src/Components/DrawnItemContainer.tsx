import React from "react";
import { DrawnItem } from "../model";
import SingleDrawnItem from "./SingleDrawnItem";

type Props = {
  drawnItems: DrawnItem[];
  isHatEmpty: boolean;
  setDrawnItems: React.Dispatch<React.SetStateAction<DrawnItem[]>>;
  isDrawnNow: boolean;
};

const DrawnItemContainer = ({
  drawnItems,
  isHatEmpty,
  setDrawnItems,
  isDrawnNow,
}: Props) => {
  const lastDrawnItem =
    drawnItems.length > 0 ? drawnItems[drawnItems.length - 1] : null;

  return (
    <div className="drawn__item__container">
      <span className="hat__heading">Posledné vytiahnuté slovo</span>
      {isHatEmpty ? (
        <span className="drawn__item__container__message">
          Klobúk, z ktorého ste ťahali je prázdny
        </span>
      ) : lastDrawnItem ? (
        <SingleDrawnItem
          drawnItem={lastDrawnItem}
          key={lastDrawnItem.id}
          drawnItems={drawnItems}
          setDrawnItems={setDrawnItems}
          isDrawnNow={isDrawnNow}
        />
      ) : (
        <span className="drawn__item__container__message">
          Slovo nebolo vytiahnuté
        </span>
      )}
    </div>
  );
};

export default DrawnItemContainer;
