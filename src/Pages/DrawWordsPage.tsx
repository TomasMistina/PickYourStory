import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DrawHatTheme from "../Components/DrawHatTheme";

const DrawWords = () => {
  const [title, setTitle] = useState<string>("Vybraný klobúk");
  const { lessonId, id} = useParams();
  const location = useLocation();
  const { drawnWordsId, drawnWordsList } = location.state || {};
  
  return (
    <DrawHatTheme
      title={title}
      setTitle={setTitle}
      id={id}
      lessonId={lessonId || null}
      drawnWordsId={drawnWordsId || null}
      drawnWordsList={drawnWordsList || null}
    />
  );
};

export default DrawWords;
