import { useState } from "react";
import { useParams } from "react-router-dom";
import DrawHatTheme from "../Components/DrawHatTheme";

const DrawWords = () => {
  const [title, setTitle] = useState<string>("Vybraný klobúk");
  const { id } = useParams();
  return (
    <DrawHatTheme
      title={title}
      setTitle={setTitle}
      id={id}
    />
  );
};

export default DrawWords;
