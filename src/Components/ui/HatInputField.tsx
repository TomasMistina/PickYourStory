import React from "react";
import "../styles.css";
import { useIsMobile } from "../../mobile/useIsMobile";

type Props = {
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
};

const HatInputField = ({ item, setItem, handleAdd }: Props) => {
  const isMobile = useIsMobile();
  return (
    <form className={isMobile ? "mobile__input " : "input"} onSubmit={handleAdd}>
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

export default HatInputField;