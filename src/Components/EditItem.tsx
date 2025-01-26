import React, { useEffect, useRef, useState } from "react";
import { Item } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./styles.css";

type Props = {
  item: Item;
  updateItem: (id: string, value: string) => void;
  deleteItem: (id: string) => void;
};

const EditItem = ({ item, updateItem, deleteItem}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<string>(item.value);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    updateItem(id, editItem);
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
        className="items__single"
        onSubmit={(e) => handleEdit(e, item.id)}
    >
        {edit ? (
        <input
            ref={inputRef}
            value={editItem}
            onChange={(e) => setEditItem(e.target.value)}
            className="items__single--text"
        />
        ) : (
        <span className="items__single--text">{item.value}</span>
        )}

        <div>
        <span
            className="icon"
            onClick={() => {
            if (!edit) {
                setEdit(!edit);
            }
            }}
        >
            <AiFillEdit />
        </span>
        <span className="icon" onClick={() => deleteItem(item.id)}>
            <AiFillDelete />
        </span>
        </div>
    </form>
  );
};

export default EditItem;
