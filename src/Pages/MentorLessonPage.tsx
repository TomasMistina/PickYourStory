import { useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LessonHTsListed from "../Components/LessonHTsListed";

const MentorLessonPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const [page, setPage] = useState(1);

    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["mentor_lessonHTs", page, id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/lesson/get-lesson/${id}?page=${page}`);
        return await response.data;
      },
      enabled: !!id,
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { data: lesson, lessonHatThemes, pagination } = data;
    console.log(data);
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };
  
    return (
      <div className="all__part__container">
        <LessonHTsListed LessonHTs={lessonHatThemes}/>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };
  
  export default MentorLessonPage;