import { useState } from "react";
import EditHatTheme from "../Components/EditHatTheme";

const CreateHat = () => {
  const [title, setTitle] = useState<string>("New Hat");
  return (
    <EditHatTheme
      title={title}
      setTitle={setTitle}
      id={undefined}
    />
  );
};

export default CreateHat;
