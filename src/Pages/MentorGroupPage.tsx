import { useRef, useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import "../Components/styles.css";
import useAuth from "../auth/useAuth";
import Pagination from "../Components/ui/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LessonsListed from "../Components/LessonsListed";
import CopyLabel from "../Components/ui/CopyLabel";
import { IoPeople } from "react-icons/io5";
import { UserPreview } from "../model";
import { useIsMobile } from "../mobile/useIsMobile";
import ParticipantNameDisplay from "../Components/ui/ParticipantNameDisplay";

//Stranka na zobrazenie mentorovanej skupiny
const MentorGroupPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const userRef = useRef<HTMLInputElement>(null);
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    
    const [lessonName, setLessonName] = useState(location.state?.lessonName || "");
    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    
    const [selectedHatTheme, setSelectedHatTheme] = useState(location.state?.selectedHatTheme || null);

    const [participantListIsOpen, setParticipantListIsOpen] = useState(false);

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
          groupId: id,
          hatThemeId: selectedHatTheme._id
        });
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["mentor_lessons", page, id] });
        setSuccessMsg(`Hodina ${data.data.lessonName} bola úspešne vytvorená`);
        setErrMsg("");
        setLessonName("");
        setSelectedHatTheme(null);
      },
      onError: (err: any) => {
        console.log("Error data"+ err);
        if (!err?.response) {
          setErrMsg("Server bez odozvy");
        } else {
          setErrMsg("Nepodarilo sa vytvoriť hodinu");
        }
        setSuccessMsg("");
      },
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { group, lessons, pagination } = data;
    
    const handlePageChange = (newPage: number) => {
      setPage(newPage);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createGroupMutation.mutate(lessonName);
    };

    const handleParticipantListToggle = async () => {
      if (!participantListIsOpen) {
        try {
          const data = await axios.get(`/group/get-participants/${id}`);
          queryClient.setQueryData(["mentor_lessons", page, id], (oldData: any) => ({
            ...oldData,
            group: {
              ...oldData.group,
              participants: data.data.group.participants,
            }
          }));
    
          setParticipantListIsOpen(true);
        } catch (error) {
          console.error("Failed to fetch participants", error);
        }
      } else {
        setParticipantListIsOpen(false);
      }
    }

    return (
      <div className="all__part__container__alt2">
        {isMobile ?
          <div className="mobile__hat__theme">
            <span className="mobile__hat__title__alt">{group?.groupName}</span>
            <div className="mobile__action__buttons">
              <div>
                <div className="copy__code">
                  <label>Účastníci</label>
                  <button className="copy__button" onClick={handleParticipantListToggle}><IoPeople/> {group?.participants?.length}</button>
                </div>
                {participantListIsOpen && (
                  <div className="name__list">
                    <div className="all__part__container">
                      {group.participants?.map((participant : UserPreview) => (
                        <ParticipantNameDisplay
                        key={participant._id}
                        name={participant.username}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <CopyLabel accessCode={group?.accessCode}/>
            </div>
          </div>
        :
          <div className="hat__theme__alt">
            <div>
              <div className="copy__code">
                <label>Účastníci</label>
                <button className="copy__button" onClick={handleParticipantListToggle}><IoPeople/> {group?.participants?.length}</button>
              </div>
              {participantListIsOpen && (
                <div className="name__list">
                    {group.participants?.map((participant : UserPreview) => (
                      <ParticipantNameDisplay
                      key={participant._id}
                      name={participant.username}
                      />
                    ))}

                </div>
              )}
            </div>
            <span className="hat__title">{group?.groupName}</span>
            <CopyLabel accessCode={group?.accessCode}/>
          </div>
        }
        <div className={isMobile ? "all__part__container" : "all__part__container__alt"}>
          {(pagination.totalPages)> 0 &&
            <div className="all__part__container">
              <LessonsListed Lessons={lessons}/>
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                />
            </div>
          }
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
              <label htmlFor="lessonName">Klobúk: {selectedHatTheme ? selectedHatTheme.title : ""}</label>
              <button onClick={() => 
                  navigate(`/mentored-groups/${id}/select-hat-theme`, { state: { lessonName } })
                }>
                {selectedHatTheme ? "Zmeniť Klobúk" : "Vybrať klobúk"}
              </button>

              <button disabled={
                !selectedHatTheme || !lessonName
                ? true
                : false
              }
              >Vytvoriť hodinu</button>
            </form>
          </section>
        </div>
      </div>
    );
  };
  
  export default MentorGroupPage;