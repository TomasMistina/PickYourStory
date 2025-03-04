import { useRef, useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import GroupsListed from "../Components/GroupsListed";
import { access } from "fs";

const ParticipantGroupsPage = () => {
    const { currentUserId } = useAuth();
    const [page, setPage] = useState(1);
    const userRef = useRef<HTMLInputElement>(null);
    
    const [groupAccessCode, setGroupAccessCode] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
  
    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["participant_groups", page, currentUserId],
      queryFn: async () => {
        const response = await axios.get(`/group/participant-groups?page=${page}&userId=${currentUserId}`);
        return await response.data;
      },
    });

    const joinGroupMutation = useMutation({
      mutationFn: async (groupAccessCode: string) => {
        const response = await axios.post("/group/join", {
          accessCode: groupAccessCode,
          userId: currentUserId,
        });
        return response.data;
      },
      onSuccess: (data) => {
        setSuccessMsg(`Úspešne ste sa pripojili do ${data.groupName}`);
        setErrMsg("");
        setGroupAccessCode("");
      },
      onError: (err: any) => {
        if (!err?.response) {
          setErrMsg("Server bez odozvy");
        } else if (err.response?.status === 400) {
          setErrMsg("Chýba meno alebo heslo");
        } else if (err.response?.status === 401) {
          setErrMsg("Nepovolené prihlásenie");
        } else {
          setErrMsg("Nepodarilo sa vytvoriť skupinu");
        }
        setSuccessMsg("");
      },
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
  
    const { data: participantGroups, pagination } = data;
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      joinGroupMutation.mutate(groupAccessCode);
    };
  
    return (
      <div className="all__part__container">
        <GroupsListed Groups={participantGroups}/>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
        <section>
          {errMsg && <p className="error__message">{errMsg}</p>}
          {successMsg && <p className="success__message">{successMsg}</p>}
          <h1>Pripojenie sa do skupiny</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="groupAccessCode">Kód prístupu:</label>
            <input
              className="input__field"
              type="text"
              id="groupAccessCode"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setGroupAccessCode(e.target.value)}
              value={groupAccessCode}
              required
            />
            <button>Pripojiť sa</button>
          </form>
        </section>
      </div>
    );
  };
  
  export default ParticipantGroupsPage;