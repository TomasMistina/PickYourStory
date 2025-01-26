import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Hat from "./Hat";
import "./styles.css";
import "./../Pages/pages.css";
import { AiFillEdit } from "react-icons/ai";
import { DrawnItem, HatThemeMode, HatType, Item } from "../model";
import DrawnItemsList from "./DrawnItemsList";
import DrawnItemContainer from "./DrawnItemContainer";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  hatThemeMode: HatThemeMode;
  id: string | undefined;
};

const HatTheme = ({ title, setTitle, hatThemeMode, id }: Props) => {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editTitleItem, setEditTitleItem] = useState<string>(title);
  const [drawnItems, setDrawnItems] = useState<DrawnItem[]>([]);
  const [isHatEmpty, setIsHatEmpty] = useState<boolean>(false);
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setTitle(editTitleItem);
    setEditTitle(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editTitle]);

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
      ownerName: currentUser,
      originHatTitle: editTitleItem,
      items: drawnItems,
    };
    try {
      const response = await axios.post("/drawn-words/save", drawnItemsData);
      if (response.status === 200) {
        console.log("Hat theme saved successfully");
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

  const handleSave = async () => {
    const data = hats.map((hat) => ({
      items: hat,
    }));
    const hatThemeData = {
      ownerName: currentUser,
      title: title,
      hats: data,
    };
    console.log("SAVE: "+ hatThemeData.ownerName+" "+hatThemeData.title+""+hatThemeData.hats);
    try {
      const response = await axios.post("/hat-theme/save", hatThemeData);
      if (response.status === 200) {
        console.log("Hat theme saved successfully");
        navigate(from, { replace: true });
      } else {
        console.error("Failed to save hat theme");
      }
    } catch (error) {
      console.error("Failed to save hat theme:", error);
    }
  };

  const handleUpdate = async () => {
    const data = hats.map((hat) => ({
      items: hat,
    }));
    const hatThemeData = {
      ownerName: currentUser,
      title: title,
      hats: data,
    };
    console.log("UPDATE: "+ hatThemeData.ownerName+" "+hatThemeData.title+""+id);
    try {
      const response = await axios.put(`/hat-theme/update/${id}`, hatThemeData);
      if (response.status === 200) {
        console.log("Hat theme updated successfully");
        navigate(from, { replace: true });
      } else {
        console.error("Failed to save hat theme");
      }
    } catch (error) {
      console.error("Failed to save hat theme:", error);
    }
  };
//#endregion


// *** UI ***
  return (
    <>
      {hatThemeMode === "edit_mode" ? (
        <div className="edit__hat__theme">
          <button
            className="load__more__button"
            onClick={handleDiscardDrawnWords}
          >
            Zahodiť zmeny
          </button>
          <form className="edit_hat_form" onSubmit={(e) => handleEdit(e)}>
            {editTitle ? (
              <input
                ref={inputRef}
                value={editTitleItem}
                onChange={(e) => setEditTitleItem(e.target.value)}
                placeholder="Názov klobúku"
                className="hat__title_edit"
              />
            ) : (
              <span className="hat__title">{title}</span>
            )}
            <span
              className="icon"
              onClick={() => {
                if (!editTitle) {
                  setEditTitle(!editTitle);
                } else {
                  setTitle(editTitleItem);
                  setEditTitle(false);
                }
              }}
            >
              <AiFillEdit />
            </span>
          </form>
          <button
            className="load__more__button"
            onClick={id ? handleUpdate : handleSave}
          >
            Uložiť zmeny
          </button>
        </div>
      ) : hatThemeMode === "draw_words_mode" ? (
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
      ) : (
        // ShowCase mode
        <div className="hat__theme">
          {currentUser === hatOwner ? (
            <Link
              className="load__more__button"
              to={`/hat-themes/my-hats/edit/${id}`}
            >
              Upraviť klobúk
            </Link>
          ) : (
            <span className="load__more__button__disabled">Upraviť klobúk</span>
          )}

          <span className="hat__title">{title}</span>
          <Link
            className="load__more__button"
            to={`/hat-themes/my-hats/draw/${id}`}
          >
            Vytiahnuť z klobúku
          </Link>
        </div>
      )}
      {hatThemeMode === "draw_words_mode" ? (
        <div className="container">
          <div className="draw__words__container">
            <Hat
              hatType={HatType.characters}
              hatThemeMode={hatThemeMode}
              updateDrawnItems={updateDrawnItems}
              setIsHatEmpty={setIsHatEmpty}
              updateHats={updateHats}
              hats={hats}
            />
            <Hat
              hatType={HatType.magical_items}
              hatThemeMode={hatThemeMode}
              updateDrawnItems={updateDrawnItems}
              setIsHatEmpty={setIsHatEmpty}
              updateHats={updateHats}
              hats={hats}
            />
            <Hat
              hatType={HatType.phrases}
              hatThemeMode={hatThemeMode}
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
      ) : (
        <div className="container">
          <Hat
            hatType={HatType.characters}
            hatThemeMode={hatThemeMode}
            updateDrawnItems={updateDrawnItems}
            setIsHatEmpty={setIsHatEmpty}
            updateHats={updateHats}
            hats={hats}
          />
          <Hat
            hatType={HatType.magical_items}
            hatThemeMode={hatThemeMode}
            updateDrawnItems={updateDrawnItems}
            setIsHatEmpty={setIsHatEmpty}
            updateHats={updateHats}
            hats={hats}
          />
          <Hat
            hatType={HatType.phrases}
            hatThemeMode={hatThemeMode}
            updateDrawnItems={updateDrawnItems}
            setIsHatEmpty={setIsHatEmpty}
            updateHats={updateHats}
            hats={hats}
          />
        </div>
      )}
    </>
  );
};

export default HatTheme;
