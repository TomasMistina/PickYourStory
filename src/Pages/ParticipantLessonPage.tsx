import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import CompactWordDisplay from "../Components/ui/CompactWordDisplay";

const ParticipantLessonPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();

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

    console.log(drawnWordsList);

    return (
      <div className="all__part__container__alt2">
        <div className="hat__theme">
          <span className="load__more__button">
            Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
          </span>
          <span className="hat__title">{lesson?.lessonName}</span>
          {!drawnWordsList.drawnWordsList
            ? 
            <button className="load__more__button"
              onClick={() => lesson?.isOpen 
              ? 
              navigate(`/participant-groups/lesson/${id}/draw/${lessonHatTheme._id}`) 
              : 
              {}}>
              Vytiahnuť z klobúku
            </button>
            : 
            <button className="load__more__button"
              onClick={() => lesson?.isOpen 
              ? 
              navigate(`/participant-groups/lesson/${id}/draw/${lessonHatTheme._id}`, 
                { state: { drawnWordsId: drawnWordsList.drawnWordsList._id, drawnWordsList: drawnWordsList.drawnWordsList.items }}) 
              : 
              {}}>
              Dotiahnuť z klobúku
            </button>
          }
        </div>
        {
          (drawnWordsList.drawnWordsList!=null)
          &&
          <div className="all__part__container__alt">
            <div className="multisection__container">
            <div className="multisection__title">Môj vytiahnutý zoznam</div>
              <CompactWordDisplay
                  title= /* {drawnWordsList.drawnWordList.owner.username} */ ""
                  items={drawnWordsList.drawnWordsList?.items}
                  key={drawnWordsList.drawnWordsList?._id}
              />
            </div>
          </div>
        }
      </div>
    );
  };
  
  export default ParticipantLessonPage;