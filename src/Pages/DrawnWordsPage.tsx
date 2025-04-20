import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import DrawnItemsList from "../Components/DrawnItemsList";
import { DrawnItem, Item } from "../model";

const DrawnWords = () => {
  const [drawnItems, setDrawnItems] = useState<Item[]>([]);
  const [originalTitle, setOriginalTitle] = useState<string>("");
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchDataForDrawnItems(id);
    } else {
      // Create default hat theme
      createDefaultDrawnItems();
    }
  }, [id]);

  const createDefaultDrawnItems = () => {};

  const fetchDataForDrawnItems = async (id: string) => {
    try {
      const response = await axios.get(`/drawn-words/get-list/${id}`);
      const drawnWordsData = response.data;
      setOriginalTitle(drawnWordsData?.originHatTheme?.title);
      console.log(drawnWordsData);
      const extractedItems: Item[] = drawnWordsData.items.map(
        (item: any) => ({
          id: item._id,
          value: item.value,
        })
      );
      setDrawnItems(extractedItems);
    } catch (error) {
      console.error("Error fetching hat theme:", error);
    }
  };
  return (
    <>
      <div className="mobile__hat__theme">
        <span className="hat__title">{"Zoznam vytiahnutý z " + (originalTitle || "neznámeho zdroja")}</span>
      </div>
      <div>
        <DrawnItemsList
          drawnItems={drawnItems}
          setDrawnItems={setDrawnItems}
          isDrawnNow={false}
        />
      </div>
    </>
  );
};

export default DrawnWords;
