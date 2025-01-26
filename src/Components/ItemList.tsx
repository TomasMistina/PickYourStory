import React from "react";
import { Item } from "../model";
import SingleItem from "./SingleItem";
import "./styles.css";

type Props = {
  items: Item[];
  updateItem: (id: string, value: string) => void;
  deleteItem: (id: string) => void;
  hatThemeMode: string;
};

const ItemList = ({ items, updateItem, deleteItem, hatThemeMode }: Props) => {
  return (
    <div className="items__container">
      <div className="items">
        {items.map((item) => (
          <SingleItem
            item={item}
            key={item.id}
            updateItem={updateItem}
            deleteItem={deleteItem}
            hatThemeMode={hatThemeMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
