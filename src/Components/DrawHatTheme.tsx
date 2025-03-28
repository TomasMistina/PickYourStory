import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import "./../Pages/pages.css";
import { HatThemeCompact, HatType, Item } from "../model";
import DrawnItemsList from "./DrawnItemsList";
import DrawnItemContainer from "./DrawnItemContainer";
import axios from "./../api/axios";
import useAuth from "../auth/useAuth";
import { useLocation, useNavigate} from "react-router-dom";
import DrawHat from "./DrawHat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  id: string | undefined;
  lessonId: string | null;
  drawnWordsId: string | null;
  drawnWordsList: Item[] | null;
};

const DrawHatTheme = ({ title, setTitle, id, lessonId, drawnWordsId, drawnWordsList }: Props) => {
  const [drawnItems, setDrawnItems] = useState<Item[]>([]);
  const [isHatEmpty, setIsHatEmpty] = useState<boolean>(false);
  const [hats, setHats] = useState<Item[][]>([[], [], []]);
  const [hatOwner, setHatOwner] = useState<string | null>(null);
  const { currentUserId } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const queryClient = useQueryClient();

  const updateDrawnItems = (drawnItem: Item) => {
    const id = uuidv4();
    setDrawnItems([
      ...drawnItems,
      { id: id, value: drawnItem.value},
    ]);
  };

  const initiatePreviousDrawnItems = (previousDrawnItems: Item[]) => {
    setDrawnItems(
      previousDrawnItems
    );
  };

  //Fetch Hat Theme Data (Using React Query)
  const { data: hatThemeData, isLoading, isError } = useQuery({
    queryKey: ["hatTheme", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await axios.get(`/hat-theme/get-hat/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  
  useEffect(() => {
    if (!hatThemeData) return;
  
    const extractedHats: Item[][] = hatThemeData.hats.map((hat : any) =>
      hat.items.map((item :any) => ({ id: item.id, value: item.value }))
    );
  
    setHats(extractedHats);
    setTitle(hatThemeData.title);
    setHatOwner(hatThemeData.ownerName);
    if (drawnWordsList != null){
      initiatePreviousDrawnItems(drawnWordsList)
    }
  }, [hatThemeData]);

  // Save Drawn Words (Using React Query Mutation)
  const saveDrawnWordsMutation = useMutation({
    mutationFn: async () => {
      const drawnItemsData = {
        ownerId: currentUserId,
        originHatTheme: id,
        items: drawnItems,
        lessonId: lessonId,
      };
      const response = await axios.post("/drawn-words/save", drawnItemsData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Drawn words saved successfully");
      navigate(lessonId ? "./../.." : `./../../${id}`, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["hat-theme", id] });
    },
    onError: (error) => {
      console.error("Failed to save drawn words:", error);
    },
  });

  const updateDrawnWordsMutation = useMutation({
    mutationFn: async () => {
      const drawnItemsData = {
        items: drawnItems,
      };
      console.log( drawnItems, drawnWordsId)
      const response = await axios.patch(`/drawn-words/update/${drawnWordsId}`, drawnItemsData);
      return response.data;
    },
    onSuccess: () => {
      console.log("Drawn words updated successfully");
      navigate(lessonId ? "./../.." : `./../../${id}`, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["hat-theme", id] });
    },
    onError: (error) => {
      console.error("Failed to update drawn words:", error);
    },
  });

  const updateHats = (updatedHats: Item[][]) => {
    setHats(updatedHats);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching hat theme.</p>;

// *** UI ***
  return (
    <>
        <div className="hat__theme">
            <button
              className="load__more__button"
              onClick={() => navigate(lessonId ? "./../.." : `./../../${id}`, { replace: true })}
            >
            Vymazať zoznam
            </button>
            <span className="hat__title">{title}</span>
            <button className="load__more__button"  
              onClick={() => {!drawnWordsId ? saveDrawnWordsMutation.mutate() : updateDrawnWordsMutation.mutate()}}>
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
