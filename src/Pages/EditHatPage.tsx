import { useState } from "react";
import { useParams } from "react-router-dom";
import EditHatTheme from "../Components/EditHatTheme";

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
