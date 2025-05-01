import { useState } from "react";
import EditHatTheme from "../Components/EditHatTheme";

//Stranka na vytvorenie klobuku
const CreateHat = () => {
  const [title, setTitle] = useState<string>("Klobúk");
  return (
    <EditHatTheme
      title={title}
      setTitle={setTitle}
      id={undefined}
    />
  );
};

export default CreateHat;
