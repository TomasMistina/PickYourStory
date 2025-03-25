import "./styles.css";
import { ExtendedHatThemePreview, HatThemePreview } from "../model";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { Link } from "react-router-dom";

type Props = {
  hatTheme: HatThemePreview;
  lessonName: string;
  id: string | undefined;
  setHatTheme: React.Dispatch<React.SetStateAction<null | ExtendedHatThemePreview>>;
  setSimpleHatTheme: React.Dispatch<React.SetStateAction<null | HatThemePreview>>;
};

const SelectCard = ({ hatTheme, setHatTheme, setSimpleHatTheme}: Props) => {

    const fetchHatTheme = useMutation({
        mutationFn: async () => {
          if (!hatTheme._id) return null;
          const response = await axios.get(`/hat-theme/get-hat/${hatTheme._id}`);
          return response.data;
        },
        onSuccess: (data) => {
          setHatTheme(data);
        },
      });

    return (
    <Link 
        to="#"
        className="single__card"
        onClick={(e) => {
        e.preventDefault();
        setSimpleHatTheme(hatTheme);
        fetchHatTheme.mutate();
        }}
    >
        <h3>{hatTheme.title}</h3>
    </Link>
    );
};

export default SelectCard;