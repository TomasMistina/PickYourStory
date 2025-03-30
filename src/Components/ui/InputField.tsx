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
        placeholder="Pridať novú položku"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        +
      </button>
    </form>
  );
};

export default InputField;
