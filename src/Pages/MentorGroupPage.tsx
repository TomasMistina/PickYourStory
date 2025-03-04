import { useRef, useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LessonsListed from "../Components/LessonsListed";

const MentorGroupPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const userRef = useRef<HTMLInputElement>(null);
    
    const [lessonName, setLessonName] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["mentor_lessons", page, id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/group/get-group/${id}?page=${page}`);
        return await response.data;
      },
      enabled: !!id,
    });

    const createGroupMutation = useMutation({
      mutationFn: async (newLessonName: string) => {
        const response = await axios.post("/lesson/create", {
          lessonName: newLessonName,
          userId: currentUserId,
          groupId: id
        });
        return response.data;
      },
      onSuccess: (data) => {
        console.log(data.accessCode);
        setSuccessMsg(`Hodina ${data.data.lessonName} bola úspešne vytvorená`);
        setErrMsg("");
        setLessonName("");
      },
      onError: (err: any) => {
        if (!err?.response) {
          setErrMsg("Server bez odozvy");
        } else if (err.response?.status === 400) {
          setErrMsg("Chýba meno alebo heslo");
        } else if (err.response?.status === 401) {
          setErrMsg("Nepovolené prihlásenie");
        } else {
          setErrMsg("Nepodarilo sa vytvoriť hodinu");
        }
        setSuccessMsg("");
      },
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { data: group, lessons, pagination } = data;
    
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createGroupMutation.mutate(lessonName);
    };
  
    return (
      <div className="all__part__container">
        <LessonsListed Lessons={lessons}/>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
        <section>
          {errMsg && <p className="error__message">{errMsg}</p>}
          {successMsg && <p className="success__message">{successMsg}</p>}
          <h1>Vytvorenie novej hodiny</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="lessonName">Meno hodiny:</label>
            <input
              className="input__field"
              type="text"
              id="lessonName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setLessonName(e.target.value)}
              value={lessonName}
              required
            />
            <button>Vytvoriť hodinu</button>
          </form>
        </section>
      </div>
    );
  };
  
  export default MentorGroupPage;