import React from "react";
import "../styles.css";

type Props = {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

const InputField = ({ item, setItem, handleAdd }: Props) => {
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="input"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter new Item"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
