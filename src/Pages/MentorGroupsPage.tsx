import { useRef, useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GroupsListed from "../Components/GroupsListed";

const MentorGroupsPage = () => {
    const { currentUserId } = useAuth();
    const [page, setPage] = useState(1);
    const userRef = useRef<HTMLInputElement>(null);

    const queryClient = useQueryClient();

    const [groupName, setGroupName] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
  
    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["mentor_groups", page, currentUserId],
      queryFn: async () => {
        const response = await axios.get(`/group/mentored-groups?page=${page}&userId=${currentUserId}`);
        return await response.data;
      },
    });

    const createGroupMutation = useMutation({
      mutationFn: async (newGroupName: string) => {
        const response = await axios.post("/group/create", {
          groupName: newGroupName,
          userId: currentUserId,
        });
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["mentor_groups", page, currentUserId] });
        setSuccessMsg(`Skupina ${data.data.groupName} bola úspešne vytvorená s kódom prístupu: ${data.data.accessCode}`);
        setErrMsg("");
        setGroupName("");
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

    const { data: mentoredGroups, pagination } = data;
  
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createGroupMutation.mutate(groupName);
    };
  
    return (
      <div className="all__part__container">
        <div className="mobile__hat__theme">
          <span className="hat__title">Moje skupiny - Mentor</span>
        </div>
        <GroupsListed Groups={mentoredGroups}/>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
        <section className="section__alt">
          {errMsg && <p className="error__message">{errMsg}</p>}
          {successMsg && <p className="success__message">{successMsg}</p>}
          <h1>Vytvorenie novej skupiny</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="groupName">Meno skupiny:</label>
            <input
              className="input__field"
              type="text"
              id="groupName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setGroupName(e.target.value)}
              value={groupName}
              required
            />
            <button>Vytvoriť skupinu</button>
          </form>
        </section>
      </div>
    );
  };
  
  export default MentorGroupsPage;