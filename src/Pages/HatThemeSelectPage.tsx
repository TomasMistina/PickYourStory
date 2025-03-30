import { useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import { ExtendedHatThemePreview, HatThemePreview } from "../model";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import SelectCard from "../Components/SelectCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CompactHatThemeDisplay from "../Components/ui/CompactHatThemeDisplay";

const HatThemeSelectPage = () => {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);
  
  const location = useLocation();
  const navigate = useNavigate();
  const lessonName = location.state?.lessonName || "";
  const { id } = useParams();

  const [currentSelectedHatTheme, setCurrentSelectedHatTheme] = useState<ExtendedHatThemePreview | null>(null);
  const [currentSelectedHatThemeSimpler, setCurrentSelectedHatThemeSimpler] = useState<HatThemePreview | null>(null);

  const {
    data,
    isError,
    isLoading,
    error
  } = useQuery({
    queryKey: ["my_select_hatthemes", page, currentUser],
    queryFn: async () => {
      const response = await axios.get(`/hat-theme/select-from-my-hats?page=${page}&username=${currentUser}`);
      return await response.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const { data: allHatThemes, pagination } = data;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="all__part__container_alt2">
      <div className="hat__theme">
        <button className="load__more__button" onClick={() =>
            navigate( `./../../group/${id}`, { 
                state: { lessonName}, 
                replace: true
            })
        }>Zrušiť výber</button>
        <span className="hat__title">Výber klobúku</span>
        <button className="load__more__button" onClick={() =>
            navigate( `./../../group/${id}`, { 
                state: { lessonName, selectedHatTheme: currentSelectedHatThemeSimpler }, 
                replace: true
            })
        }>Potvrdiť výber</button>
      </div>
      <div className="all__part__container__alt">
        <div className="all__part__container">
          <div className="scroll__container">
            <div className="hattheme_collection">
              {allHatThemes?.map((hatTheme : HatThemePreview) => (
                <SelectCard
                key={hatTheme._id}
                hatTheme={hatTheme}
                lessonName={lessonName}
                id={id}
                setHatTheme={setCurrentSelectedHatTheme}
                setSimpleHatTheme={setCurrentSelectedHatThemeSimpler}
                />
              ))}
            </div>
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            />
        </div>
        {!currentSelectedHatTheme ? <></> : 
        <CompactHatThemeDisplay lessonHatTheme={currentSelectedHatTheme}/>}
      </div>
      
    </div>
  );
};

export default HatThemeSelectPage;
