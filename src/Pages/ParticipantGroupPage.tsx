import { useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LessonsListed from "../Components/LessonsListed";
import { useIsMobile } from "../mobile/useIsMobile";

const ParticipantGroupPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const isMobile = useIsMobile();

    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["participant_lessons", page, id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/group/get-group/${id}?page=${page}`);
        return await response.data;
      },
      enabled: !!id,
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { group, lessons, pagination } = data;
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  
    return (
      <div className="all__part__container">
        <div className={isMobile ? "mobile__hat__theme" : "hat__theme"}>
          <span className={isMobile ? "mobile__hat__title__alt" : "hat__title"}>{group?.groupName}</span>
        </div>
        <LessonsListed Lessons={lessons}/>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };
  
  export default ParticipantGroupPage;