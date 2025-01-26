import React, { useState } from "react";
import { HatThemeMode, HatType, Item } from "../model";
import { v4 as uuidv4 } from "uuid";
import InputField from "./ui/InputField";
import ItemList from "./ItemList";
import "./styles.css";

type Props = {
  hatType: HatType;
  hatThemeMode: HatThemeMode;
  updateDrawnItems: (item: Item) => void;
  setIsHatEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  updateHats: (updatedHats: Item[][]) => void;
  hats: Item[][];
};

const Hat = ({
  hatType,
  hatThemeMode,
  updateDrawnItems,
  setIsHatEmpty,
  updateHats,
  hats,
}: Props) => {
  const [item, setItem] = useState<string>("");

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
  const handleDelete = (id: string) => {
    const updatedHats = [...hats];
    updatedHats[hatIndex] = updatedHats[hatIndex].filter(
      (item) => item.id !== id
    );
    updateHats(updatedHats);
  };

  const handleEdit = (id: string, value: string) => {
    const updatedHats = [...hats];
    updatedHats[hatIndex] = updatedHats[hatIndex].map((item) =>
      item.id === id ? { ...item, value: value } : item
    );
    updateHats(updatedHats);
  };

  const handleAdd = (e: React.FormEvent, hats: Item[][]) => {
    e.preventDefault();
    if (item) {
      const id = uuidv4();
      const updatedHats = [...hats];
      updatedHats[hatIndex].push({ id: id, value: item });
      updateHats(updatedHats);
      setItem("");
    }
  };
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
    <div className={hatThemeMode === "draw_words_mode" ? "draw__hat" : "hat"}>
      <span className="hat__heading">{hatType}</span>
      {hatThemeMode === "edit_mode" ? (
        <>
          <InputField
            item={item}
            setItem={setItem}
            handleAdd={(e) => handleAdd(e, hats)}
          />
          <ItemList
            items={hats[hatIndex]}
            updateItem={handleEdit}
            deleteItem={handleDelete}
            hatThemeMode={hatThemeMode}
          />
        </>
      ) : (
        <>
          {hatThemeMode === "showcase_mode" ? (
            <>
              <ItemList
                items={hats[hatIndex]}
                updateItem={handleEdit}
                deleteItem={handleDelete}
                hatThemeMode={hatThemeMode}
              />
            </>
          ) : (
            <button type="button" className="draw__button" onClick={handleDraw}>
              Vytiahnuť slovo z klobúku
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Hat;
