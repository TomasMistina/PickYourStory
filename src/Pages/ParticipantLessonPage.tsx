import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CompactWordDisplay from "../Components/ui/CompactWordDisplay";
import { DrawnWordsList } from "../model";

const ParticipantLessonPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();

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
      data: drawnWordsLists,
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
    if (!drawnWordsLists) return <p>No drawn words found</p>;

    console.log(lesson, lessonHatTheme);

    return (
      <div className="all__part__container__alt2">
        <div className="hat__theme">
          <span className="load__more__button">
            Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
          </span>
          <span className="hat__title">{lesson?.lessonName}</span>
          <Link
          className="load__more__button"
          to={lesson?.isOpen ? `/participant-groups/lesson/${id}/draw/${lessonHatTheme._id}` : "#"}
          >
            Vytiahnuť z klobúku
          </Link>
        </div>
        <div className="all__part__container__alt">
          <div className="multisection__container">
            <div className="multisection__title">{lessonHatTheme.title}</div>
            <CompactWordDisplay title="Postavy" items={lessonHatTheme.hats[0].items}/>
            <CompactWordDisplay title="Predmety" items={lessonHatTheme.hats[1].items}/>
            <CompactWordDisplay title="Frázy" items={lessonHatTheme.hats[2].items}/>
          </div>
          <div className="multisection__container">
          <div className="multisection__title">Mnou vytiahnuté zoznamy</div>
          {drawnWordsLists.drawnWordsLists?.map((drawnWordList : DrawnWordsList) => (
            <CompactWordDisplay
                title= /* {drawnWordList.owner.username} */ ""
                items={drawnWordList.items}
                key={drawnWordList._id}
            />
            ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default ParticipantLessonPage;