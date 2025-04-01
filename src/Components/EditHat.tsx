import React, { useState } from "react";
import { HatType, Item } from "../model";
import { v4 as uuidv4 } from "uuid";
import InputField from "./ui/InputField";
import "./styles.css";
import EditItemList from "./EditItemList";
import { useIsMobile } from "../mobile/useIsMobile";
import HatInputField from "./ui/HatInputField";

type Props = {
  hatType: HatType;
  updateHats: (updatedHats: Item[][]) => void;
  hats: Item[][];
  isShown?: boolean;
};

const EditHat = ({
  hatType,
  updateHats,
  hats,
  isShown
}: Props) => {
  const [item, setItem] = useState<string>("");
  const isMobile = useIsMobile();

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
  return (
  <>
    {isMobile 
      ? 
      <>
      {isShown
        ? 
        <div className={"mobile__hat"+hatIndex}>
          <HatInputField
          item={item}
          setItem={setItem}
          handleAdd={(e) => handleAdd(e, hats)}
          />
          <EditItemList
          items={hats[hatIndex]}
          updateItem={handleEdit}
          deleteItem={handleDelete}
          />
        </div> 
        : 
        <>
        </>
      }
      </>
      : 
      <div className="hat">
        <span className="hat__heading">{hatType}</span>
          <>
            <InputField
              item={item}
              setItem={setItem}
              handleAdd={(e) => handleAdd(e, hats)}
              />
            <EditItemList
              items={hats[hatIndex]}
              updateItem={handleEdit}
              deleteItem={handleDelete}
              />
          </>
      </div>
    }
  </>
  );
};

export default EditHat;
