import React, { useEffect, useState } from "react";
import "./styles.css";
import "./../Pages/pages.css";
import { HatType, Item} from "../model";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ShowcaseHat from "./ShowcaseHat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsMobile } from "../mobile/useIsMobile";
import MobileTabLayout from "./ui/MobileTabLayout";
import { FaToggleOn, FaToggleOff} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const toggleHatVisibilityMutation = useMutation({
    mutationFn: async (makePublic : boolean) => {
      const response = await axios.patch(`/hat-theme/toggle-visibility/${id}`, {
        makePublic: makePublic,
      });
      return response.data;
    },
    onSuccess: () => {
      setErrMsg("");
      queryClient.invalidateQueries({ queryKey: ["hatTheme", id, currentUserId] });
    },
    onError: (err: any) => {
      console.log("Error data"+ err);
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else {
        setErrMsg("Nepodarilo sa prestaviť viditeľnosť klobúku");
      }
      setSuccessMsg("");
    },
  });

  const deleteHatMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.patch(`/hat-theme/delete/${id}`, {
      });
      return response.data;
    },
    onSuccess: () => {
      setErrMsg("");
      queryClient.invalidateQueries({ queryKey: ["hatTheme", id, currentUserId] });
      navigate("/hat-themes/my-hats", { replace: true });
    },
    onError: (err: any) => {
      console.log("Error data"+ err);
      if (!err?.response) {
        setErrMsg("Server bez odozvy");
      } else {
        setErrMsg("Nepodarilo sa vymazať klobúk");
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
            <span className="mobile__hat__title">{title} <button onClick={() => deleteHatMutation.mutate()} className="delete__button"><MdDelete/></button></span>
            <div className="mobile__action__buttons">
              {(currentUserId === hatOwner) &&
                <Link
                className="mobile__action__button"
                to={`/hat-themes/my-hats/edit/${id}`}
                >
                Upraviť klobúk
                </Link>
              }
              <button className="mobile__action__button" 
                onClick={() => copyHatThemeMutation.mutate()}>
                Kopírovať klobúk
              </button>

              <Link
              className="mobile__action__button"
              to={`./../draw/${id}`}
              >
                Vytiahnuť z klobúku
              </Link>

              {(currentUserId === hatOwner) && (
              <span className="visibility__label">
                Viditeľnosť ostatnými
                <button className={hatThemeData?.isPublic ? "visibility__button__on" : "visibility__button__off" } onClick={() => toggleHatVisibilityMutation.mutate(!(hatThemeData?.isPublic))}>
                  {hatThemeData?.isPublic ? <FaToggleOn /> : <FaToggleOff /> }
                </button>
              </span>
              )}
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
            <button className="action__button" onClick={() => copyHatThemeMutation.mutate()}>Kopírovať klobúk</button>
            {(currentUserId === hatOwner) && (
              <Link
              className="action__button"
              to={`/hat-themes/my-hats/edit/${id}`}
              >
              Upraviť klobúk
            </Link>
            ) }

            <span className="hat__title">{title} <button onClick={() => deleteHatMutation.mutate()} className="delete__button"><MdDelete/></button></span>
            
            <Link
            className="action__button"
            to={`./../draw/${id}`}
            >
              Vytiahnuť z klobúku
            </Link>
            {(currentUserId === hatOwner) && (
              <span className="visibility__label">
                Viditeľnosť ostatnými
                <button className={hatThemeData?.isPublic ? "visibility__button__on" : "visibility__button__off" } onClick={() => toggleHatVisibilityMutation.mutate(!(hatThemeData?.isPublic))}>
                  {hatThemeData?.isPublic ? <FaToggleOn /> : <FaToggleOff /> }
                </button>
              </span>
            )}
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
