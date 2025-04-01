import React from "react";
import { DrawnItem, Item } from "../model";
import SingleDrawnItem from "./SingleDrawnItem";
import { useIsMobile } from "../mobile/useIsMobile";

type Props = {
  drawnItems: Item[];
  isHatEmpty: boolean;
  setDrawnItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isDrawnNow: boolean;
};

const DrawnItemContainer = ({
  drawnItems,
  isHatEmpty,
  setDrawnItems,
  isDrawnNow,
}: Props) => {
  const isMobile = useIsMobile();
  const lastDrawnItem =
    drawnItems.length > 0 ? drawnItems[drawnItems.length - 1] : null;

  return (
    <div className="drawn__item__container">
      <span className={isMobile? "mobile__hat__heading" : "hat__heading" }>Posledné vytiahnuté</span>
      {isHatEmpty ? (
        <span className={isMobile ? "mobile__drawn__item__container__message" : "drawn__item__container__message"}>
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
        <span className={isMobile ? "mobile__drawn__item__container__message" : "drawn__item__container__message"}>
          Zatiaľ nebolo nič vytiahnuté
        </span>
      )}
    </div>
  );
};

export default DrawnItemContainer;
