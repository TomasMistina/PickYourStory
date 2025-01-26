import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import DrawnItemsList from "../Components/DrawnItemsList";
import { DrawnItem } from "../model";

const DrawnWords = () => {
  const [drawnItems, setDrawnItems] = useState<DrawnItem[]>([]);
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
      const extractedItems: DrawnItem[] = drawnWordsData.items.map(
        (item: any) => ({
          id: item._id,
          value: item.value,
          isDone: item.isDone,
        })
      );
      setDrawnItems(extractedItems);
    } catch (error) {
      console.error("Error fetching hat theme:", error);
    }
  };
  return (
    <>
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
