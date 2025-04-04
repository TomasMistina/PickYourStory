import React, { useEffect, useState } from "react";
import "./styles.css";
import "./../Pages/pages.css";
import { HatType, Item} from "../model";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import ShowcaseHat from "./ShowcaseHat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIsMobile } from "../mobile/useIsMobile";
import MobileTabLayout from "./ui/MobileTabLayout";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
};

const ShowcaseHatTheme = ({ title, setTitle, id }: Props) => {
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUser, currentUserId } = useAuth();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<number>(1);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { data: hatThemeData, isLoading, isError} = useQuery({
    queryKey: ["hatTheme", id, currentUserId],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(`/hat-theme/get-hat/${id}?userId=${currentUserId}`);
      return response.data;
    },
    enabled: !!id,
    retry: false,
  });

  useEffect(() => {
    if (hatThemeData) {
      const extractedHats: Item[][] = hatThemeData.hats.map((hat: any) =>
        hat.items.map((item: any) => ({ id: item.id, value: item.value }))
      );
      setHats(extractedHats);
      setTitle(hatThemeData.title);
      setHatOwner(hatThemeData.owner);
    }
  }, [hatThemeData]);

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

  if (isError) {
    return <p className="error__message">Tento klobúk nie je verejný, nemáte k nemu prístup</p>;
  }

  return (
    <>
      {isLoading && <p>Načítavam...</p>}
      {errMsg && <p className="error__message">{errMsg}</p>}
      {successMsg && <p className="success__message">{successMsg}</p>}
      {isMobile 
        ?
        <>
          <div className="mobile__hat__theme">
            <span className="mobile__hat__title">{title}</span>
            <div className="mobile__action__buttons">
              {currentUserId === hatOwner ? (
                <Link
                className="mobile__action__button"
                to={`/hat-themes/my-hats/edit/${id}`}
                >
                Upraviť klobúk
              </Link>
              ) : (
                <button className="mobile__action__button" 
                  onClick={() => copyHatThemeMutation.mutate()}>
                  Kopírovať klobúk
                </button>
              )}
              <Link
              className="mobile__action__button"
              to={`./../draw/${id}`}
              >
                Vytiahnuť z klobúku
              </Link>
            </div>
          </div>
          <div className="mobile__container">
            <MobileTabLayout selected={selected} setSelected={setSelected}/>
            <ShowcaseHat
              hatType={HatType.characters}
              hats={hats}
              isShown={selected===1}
              />
            <ShowcaseHat
              hatType={HatType.magical_items}
              hats={hats}
              isShown={selected===2}
              />
            <ShowcaseHat
              hatType={HatType.phrases}
              hats={hats}
              isShown={selected===3}
              />
          </div>  
        </>
        : 
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
      }  
    </>
  );
};

export default ShowcaseHatTheme;
