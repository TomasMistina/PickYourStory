import { useState } from "react";
import Card from "../Components/Card";
import axios from "../api/axios";
import "./pages.css";
import { HatThemePreview } from "../model";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";

//Stranka zobrayujuca moje klobuky
const MyHatThemes = () => {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);

  const {
    data,
    isError,
    isLoading,
    error
  } = useQuery({
    queryKey: ["my_hatthemes", page, currentUser],
    queryFn: async () => {
      const response = await axios.get(`/hat-theme/my-hats?page=${page}&username=${currentUser}`);
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
    <div className="all__part__container">
      <div className="mobile__hat__theme">
        <span className="hat__title">Moje klobúky</span>
      </div>
      <div className="scroll__container">
        <div className="hattheme_collection">
          {allHatThemes?.map((hatTheme : HatThemePreview) => (
            <Card
              key={hatTheme._id}
              title={hatTheme.title}
              owner={null}
              id={hatTheme._id}
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
  );
};

export default MyHatThemes;
