import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import "./../Pages/pages.css";
import { AiFillEdit } from "react-icons/ai";
import { HatType, Item } from "../model";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { useLocation, useNavigate} from "react-router-dom";
import EditHat from "./EditHat";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
};

const EditHatTheme = ({ title, setTitle, id }: Props) => {
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editTitleItem, setEditTitleItem] = useState<string>(title);
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser, currentUserId} = useAuth();

  const [errMsg, setErrMsg] = useState("");

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

  const handleDiscardChanges = () => {
    if (id) {
      navigate(`/hat-themes/my-hats/${id}`, { replace: true });
    }else {
      navigate("/hat-themes/my-hats", { replace: true });
    }
  };

//#region HatTheme Section

  const createDefaultHatTheme = () => {};

  const fetchDataForHatTheme = async (id: string) => {
    try {
      const response = await axios.get(`/hat-theme/get-hat/${id}?userId=${currentUserId}`);
      const hatThemeData = response.data;
      const extractedHats: Item[][] = hatThemeData.hats.map((hat: any) =>
        hat.items.map((item: any) => ({
          id: item.id,
          value: item.value,
        }))
      );
      setHats(extractedHats);
      setTitle(hatThemeData.title);
      setEditTitleItem(hatThemeData.title);
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
      ownerId: currentUserId,
      title: title,
      hats: data,
    };
    console.log("SAVE: "+hatThemeData.hats[1].items);
    try {
      const response = await axios.post("/hat-theme/save", hatThemeData);
      if (response.status === 200) {
        console.log("Hat theme saved successfully");
        navigate("/hat-themes/my-hats", { replace: true });
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
      ownerId: currentUserId,
      title: editTitleItem,
      hats: data,
    };
    console.log("UPDATE: "+ hatThemeData.ownerId+" "+hatThemeData.title+""+id);
    try {
      const response = await axios.put(`/hat-theme/update/${id}`, hatThemeData);
      if (response.status === 200) {
        console.log("Hat theme updated successfully");
        navigate(`/hat-themes/my-hats/${id}`, { replace: true });
      } else {
        console.error("Failed to save hat theme");
      }
    } catch (error) {
      console.error("Failed to save hat theme:", error);
    }
  };

  const handleEmptyCheck = () =>{
    if (hats[0][0] == null || hats[1][0] == null || hats[2][0] == null){
      setErrMsg("Na uloženie musia mať všetky tri časti klobúka aspoň 1 položku");
      return false; 
    }else{
      setErrMsg("");
      return true;
    }
  }
//#endregion


// *** UI ***
  return (
    <>
      {errMsg && <p className="error__message">{errMsg}</p>}
      <div className="edit__hat__theme">
        <button
          className="load__more__button"
          onClick={handleDiscardChanges}
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
          onClick={ () => { 
            const isNotEmpty = handleEmptyCheck();
            if (isNotEmpty){
              {id ? handleUpdate() : handleSave()}}}
            }
        >
          Uložiť zmeny
        </button>
      </div>
      <div className="container">
        <EditHat
          hatType={HatType.characters}
          updateHats={updateHats}
          hats={hats}
        />
        <EditHat
          hatType={HatType.magical_items}
          updateHats={updateHats}
          hats={hats}
        />
        <EditHat
          hatType={HatType.phrases}
          updateHats={updateHats}
          hats={hats}
        />
      </div>
    </>
  );
};

export default EditHatTheme;
