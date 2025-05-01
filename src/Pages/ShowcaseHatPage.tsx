import { useState } from "react";
import "./pages.css";
import { useParams } from "react-router-dom";
import ShowcaseHatTheme from "../Components/ShowcaseHatTheme";

//Stranka na zobrazenie klobuku
const ShowcaseHat = () => {
  const [title, setTitle] = useState<string>("New Hat");
  const { id } = useParams();

  return (
    <ShowcaseHatTheme
      title={title}
      setTitle={setTitle}
      id={id}
    />
  );
};

export default ShowcaseHat;
