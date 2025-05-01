import { useState } from "react";
import { useParams } from "react-router-dom";
import EditHatTheme from "../Components/EditHatTheme";

//pri vytváraní stránky na vytvorenie a úpravu klobúkov som sa inšpiroval videom: https://www.youtube.com/watch?v=FJDVKeh7RJI
const EditHat = () => {
  const [title, setTitle] = useState<string>("Nový klobúk");
  const { id } = useParams();
  return (
    <EditHatTheme
      title={title}
      setTitle={setTitle}
      id={id}
    />
  );
};

export default EditHat;
