import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CompactWordDisplay from "../Components/ui/CompactWordDisplay";
import { useIsMobile } from "../mobile/useIsMobile";

const ParticipantLessonPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const isMobile = useIsMobile();

    const navigate = useNavigate();

    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["participant_lessonHT", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/lesson/get-lesson/${id}`);
        return await response.data;
      },
      enabled: !!id,
    });
  
    const {
      data: drawnWordsList,
      isError: isErrorWordsLists,
      isLoading: isLoadingWordsLists,
      error: errorWordsLists,
    } = useQuery({
      queryKey: ["drawn_words_mine", id, currentUserId],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/lesson/get-drawn-words/mine/${id}?userId=${currentUserId}`);
        return response.data;
      },
      enabled: !!id,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { lesson, lessonHatTheme } = data;

    if (isLoadingWordsLists) return <p>Loading drawn words...</p>;
    if (isErrorWordsLists) return <p>Error fetching words: {errorWordsLists.message}</p>;
    
    const handleNavigateNewDraw = () => {
      if (lesson?.isOpen){
        navigate(`/participant-groups/lesson/${id}/draw/${lessonHatTheme._id}`)
      }
    };

    const handleNavigateRedraw = () => {
      if (lesson?.isOpen){
        navigate(`/participant-groups/lesson/${id}/draw/${lessonHatTheme._id}`, 
        { state: { drawnWordsId: drawnWordsList.drawnWordsList._id, drawnWordsList: drawnWordsList.drawnWordsList.items }}) 
      }
    };

    return (
      <div className="all__part__container__alt2">
        {isMobile 
          ? 
          <div className="mobile__hat__theme">
            <span className="mobile__hat__title__alt">{lesson?.lessonName}</span>
            <div className="mobile__action__buttons"> 
              <span className="mobile__action__button">
                Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
              </span>
              {!drawnWordsList.drawnWordsList
                ? 
                <button className="mobile__action__button"
                  onClick={handleNavigateNewDraw}>
                  Vytiahnuť z klobúka
                </button>
                : 
                <button className="mobile__action__button"
                  onClick={handleNavigateRedraw}>
                  Dotiahnuť z klobúka
                </button>
              }
            </div>
          </div>
          : 
          <div className="hat__theme">
            <span className="action__button">
              Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
            </span>
            <span className="hat__title">{lesson?.lessonName}</span>
            {!drawnWordsList.drawnWordsList
              ? 
              <button className="action__button"
                onClick={handleNavigateNewDraw}>
                Vytiahnuť z klobúka
              </button>
              : 
              <button className="action__button"
                onClick={handleNavigateRedraw}>
                Dotiahnuť z klobúka
              </button>
            }
          </div>
        }
        {
          (drawnWordsList.drawnWordsList!=null)
          &&
          <div className="all__part__container__alt">
            <div className={isMobile ? "mobile__multisection__container__other" :"multisection__container__other"}>
            <div className={isMobile ? "mobile__multisection__title" : "multisection__title"}>Môj vytiahnutý zoznam</div>
              <CompactWordDisplay
                  title= /* {drawnWordsList.drawnWordList.owner.username} */ ""
                  items={drawnWordsList.drawnWordsList?.items}
                  key={drawnWordsList.drawnWordsList?._id}
                  sectionStyle="mobile__section__container__my__words__view"
              />
            </div>
          </div>
        }
      </div>
    );
  };
  
  export default ParticipantLessonPage;