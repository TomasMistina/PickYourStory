import { useState } from "react";
import { useParams } from "react-router-dom";
import DrawHatTheme from "../Components/DrawHatTheme";

const DrawWords = () => {
  const [title, setTitle] = useState<string>("Vybraný klobúk");
  const { lessonId, id } = useParams();
  
  return (
    <DrawHatTheme
      title={title}
      setTitle={setTitle}
      id={id}
      lessonId={lessonId || null}
    />
  );
};

export default DrawWords;
