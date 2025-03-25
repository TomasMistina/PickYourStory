import React, { useEffect, useState } from "react";
import "./styles.css";
import "./../Pages/pages.css";
import { HatType, Item } from "../model";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import ShowcaseHat from "./ShowcaseHat";
import { useMutation } from "@tanstack/react-query";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
};

const ShowcaseHatTheme = ({ title, setTitle, id }: Props) => {
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser, currentUserId } = useAuth();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const copyHatThemeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/hat-theme/copy/${id}`, {
        userId: currentUserId,
      });
      console.log(response);
      return response.data;
    },
    onSuccess: () => {
      setSuccessMsg("Klobúk bol úspešne skopírovaný");
      setErrMsg("");
    },
    onError: (err: any) => {
      console.log("Error data"+ err);
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else {
        setErrMsg("Nepodarilo sa kopírovať klobúk");
      }
      setSuccessMsg("");
    },
  });

  return (
    <>
        {errMsg && <p className="error__message">{errMsg}</p>}
        {successMsg && <p className="success__message">{successMsg}</p>}
        <div className="hat__theme">
            {currentUserId === hatOwner ? (
            <Link
                className="load__more__button"
                to={`/hat-themes/my-hats/edit/${id}`}
            >
              Upraviť klobúk
            </Link>
            ) : (
            <button className="load__more__button" onClick={() => copyHatThemeMutation.mutate()}>Kopírovať klobúk</button>
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
