import React, { useEffect, useState } from "react";
import "./styles.css";
import "./../Pages/pages.css";
import { HatType, Item } from "../model";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import ShowcaseHat from "./ShowcaseHat";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
};

const ShowcaseHatTheme = ({ title, setTitle, id }: Props) => {
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser, currentUserId } = useAuth();

  //Fetching data for Hat Theme
  useEffect(() => {
    console.log("Hat Id: "+id);
    if (id) {
      fetchDataForHatTheme(id);
    } else {
      createDefaultHatTheme();
    }
  }, [id]);
  
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
      console.log(hatThemeData.owner);
      console.log(currentUserId);
      setHatOwner(hatThemeData.owner);
    } catch (error) {
      console.error("Error fetching hat theme:", error);
    }
  };

  return (
    <>
        <div className="hat__theme">
            {currentUserId === hatOwner ? (
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
            to={`./../draw/${id}`}
            >
            Vytiahnuť z klobúku
            </Link>
        </div>
        <div className="container">
            <ShowcaseHat
            hatType={HatType.characters}
            hats={hats}
            />
            <ShowcaseHat
            hatType={HatType.magical_items}
            hats={hats}
            />
            <ShowcaseHat
            hatType={HatType.phrases}
            hats={hats}
            />
        </div>
    </>
  );
};

export default ShowcaseHatTheme;
