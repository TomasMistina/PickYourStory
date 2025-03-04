import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import "./../Pages/pages.css";
import { DrawnItem, HatType, Item } from "../model";
import DrawnItemsList from "./DrawnItemsList";
import DrawnItemContainer from "./DrawnItemContainer";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { useLocation, useNavigate} from "react-router-dom";
import DrawHat from "./DrawHat";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
};

const DrawHatTheme = ({ title, setTitle, id }: Props) => {
  const [drawnItems, setDrawnItems] = useState<DrawnItem[]>([]);
  const [isHatEmpty, setIsHatEmpty] = useState<boolean>(false);
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser, currentUserId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //Fetching data for Hat Theme
  useEffect(() => {
    console.log("Hat Id: "+id);
    if (id) {
      fetchDataForHatTheme(id);
    } else {
      createDefaultHatTheme();
    }
  }, [id]);

//#region DrawnItems Section
  const handleDiscardDrawnWords = () => {
    navigate(from, { replace: true });
  };

  const updateDrawnItems = (drawnItem: Item) => {
    const id = uuidv4();
    setDrawnItems([
      ...drawnItems,
      { id: id, value: drawnItem.value, isDone: false },
    ]);
  };

  const handleSaveDrawnWords = async () => {
    const drawnItemsData = {
      ownerId: currentUserId,
      originHatTheme: id,
      items: drawnItems,
    };
    try {
      console.log(drawnItemsData.ownerId);
      const response = await axios.post("/drawn-words/save", drawnItemsData);
      if (response.status === 200) {
        console.log("Drawn words saved successfully");
        navigate(from, { replace: true });
      } else {
        console.error("Failed to save hat theme");
      }
    } catch (error) {
      console.error("Failed to save hat theme:", error);
    }
  };
//#endregion
//#region HatTheme Section

  const createDefaultHatTheme = () => {};

  const fetchDataForHatTheme = async (id: string) => {
    try {
      const response = await axios.get(`/hat-theme/get-hat/${id}`);
      const hatThemeData = response.data;
      const extractedHats: Item[][] = hatThemeData.hats.map((hat: any) =>
        hat.items.map((item: any) => ({
          id: item.id,
          value: item.value,
        }))
      );
      setHats(extractedHats);
      setTitle(hatThemeData.title);
      setHatOwner(hatThemeData.ownerName);
    } catch (error) {
      console.error("Error fetching hat theme:", error);
    }
  };

  const updateHats = (updatedHats: Item[][]) => {
    setHats(updatedHats);
  };

//#endregion


// *** UI ***
  return (
    <>
        <div className="hat__theme">
            <button
            className="load__more__button"
            onClick={handleDiscardDrawnWords}
            >
            Vymazať zoznam
            </button>
            <span className="hat__title">{title}</span>
            <button className="load__more__button" onClick={handleSaveDrawnWords}>
            Uložiť zoznam
            </button>
        </div>
        <div className="container">
            <div className="draw__words__container">
            <DrawHat
                hatType={HatType.characters}
                updateDrawnItems={updateDrawnItems}
                setIsHatEmpty={setIsHatEmpty}
                updateHats={updateHats}
                hats={hats}
            />
            <DrawHat
                hatType={HatType.magical_items}
                updateDrawnItems={updateDrawnItems}
                setIsHatEmpty={setIsHatEmpty}
                updateHats={updateHats}
                hats={hats}
            />
            <DrawHat
                hatType={HatType.phrases}
                updateDrawnItems={updateDrawnItems}
                setIsHatEmpty={setIsHatEmpty}
                updateHats={updateHats}
                hats={hats}
            />
            </div>
            <DrawnItemContainer
            drawnItems={drawnItems}
            isHatEmpty={isHatEmpty}
            setDrawnItems={setDrawnItems}
            isDrawnNow={true}
            />
            <DrawnItemsList
            drawnItems={drawnItems}
            setDrawnItems={setDrawnItems}
            isDrawnNow={true}
            />
        </div>
    </>
  );
};

export default DrawHatTheme;
