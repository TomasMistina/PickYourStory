import { useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import { DrawnWordsPreview } from "../model";
import useAuth from "../auth/useAuth";
import DrawnCard from "../Components/DrawnCard";
import Pagination from "../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";

const MyDrawnWords = () => {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);

  const {
    data,
    isError,
    isLoading,
    error
  } = useQuery({
    queryKey: ["all_hatthemes", page, currentUser],
    queryFn: async () => {
      const response = await axios.get(`/drawn-words/my-drawn-list?page=${page}&username=${currentUser}`);
      return await response.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const { data: drawnWords, pagination } = data;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="all__part__container">
      <div className="scroll__container">
        <div className="hattheme_collection">
          {drawnWords.map((drawnWord : DrawnWordsPreview) => (
            <DrawnCard
              key={drawnWord._id}
              title={drawnWord.originHatTitle}
              owner={null}
              id={drawnWord._id}
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

export default MyDrawnWords;
