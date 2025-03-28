import React from "react";
import { HatType, Item } from "../model";
import "./styles.css";

type Props = {
  hatType: HatType;
  updateDrawnItems: (item: Item) => void;
  setIsHatEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  updateHats: (updatedHats: Item[][]) => void;
  hats: Item[][];
};

const DrawHat = ({
  hatType,
  updateDrawnItems,
  setIsHatEmpty,
  updateHats,
  hats,
}: Props) => {

  let hatIndex = -1;
  switch (hatType) {
    case HatType.characters:
      hatIndex = 0;
      break;
    case HatType.magical_items:
      hatIndex = 1;
      break;
    case HatType.phrases:
      hatIndex = 2;
      break;
    default:
      break;
  }
  const handleDraw = () => {
    if (hats[hatIndex].length > 0) {
      let randomItem =
        hats[hatIndex][Math.floor(Math.random() * hats[hatIndex].length)];
      const updatedHats = [...hats];
      updatedHats[hatIndex] = updatedHats[hatIndex].filter(
        (item) => item.id !== randomItem.id
      );
      updateDrawnItems(randomItem);
      updateHats(updatedHats);
      setIsHatEmpty(false);
    } else {
      setIsHatEmpty(true);
    }
  };
  return (
    <div className="draw__hat">
      <span className="hat__heading">{hatType}</span>
        <button type="button" className="draw__button" onClick={handleDraw}>
            Vytiahnuť
        </button>
    </div>
  );
};

export default DrawHat;
