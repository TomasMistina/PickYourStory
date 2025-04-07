import { useState } from "react";
import axios from "../api/axios";
import "./pages.css";
import useAuth from "../auth/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import CompactWordDisplay from "../Components/ui/CompactWordDisplay";
import { DrawnWordsList } from "../model";
import { useIsMobile } from "../mobile/useIsMobile";

const MentorLessonPage = () => {
    const { currentUserId } = useAuth();
    const { id } = useParams();
    const isMobile = useIsMobile();

    const queryClient = useQueryClient();
    
    const {
      data,
      isError,
      isLoading,
      error
    } = useQuery({
      queryKey: ["mentor_lessonHT", id],
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
      queryKey: ["drawn_words_all", id],
      queryFn: async () => {
        if (!id) return null;
        const response = await axios.get(`/lesson/get-drawn-words/all/${id}`);
        return response.data;
      },
      enabled: !!id,
    });

    const toggleLock = useMutation({
      mutationFn: async () => {
        const response = await axios.patch(`/lesson/toggle-lock/${id}`,);
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["mentor_lessonHT", id] });
      },
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    if (!data) return <p>No group found</p>;

    const { lesson, lessonHatTheme } = data;

    if (isLoadingWordsLists) return <p>Loading drawn words...</p>;
    if (isErrorWordsLists) return <p>Error fetching words: {errorWordsLists.message}</p>;
    if (!drawnWordsLists) return <p>No drawn words found</p>;

    return (
      <div className="all__part__container__alt2">

        {isMobile 
          ? 
          <div className="mobile__hat__theme">
            <span className="mobile__hat__title__alt">{lesson?.lessonName}</span>
            <div className="mobile__action__buttons">
              <span className={lesson?.isOpen ? "mobile__action__nonbutton__disabled" : "mobile__action__nonbutton__disabled__closed"}>
                Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
              </span>
              <button className="mobile__action__button" onClick={() => toggleLock.mutate()}>
                {lesson?.isOpen ? "Uzavrieť klobúk" : "Otvoriť klobúk"}
              </button>
            </div>
          </div>
          : 
          <div className="hat__theme">
            <span className={lesson?.isOpen ? "action__nonbutton__disabled" : "action__nonbutton__disabled__closed"}>
              Klobúk je {lesson?.isOpen ? "otvorený" : "uzavretý"}
            </span>
            <span className="hat__title">{lesson?.lessonName}</span>
            <button className="action__button" onClick={() => toggleLock.mutate()}>
              {lesson?.isOpen ? "Uzavrieť klobúk" : "Otvoriť klobúk"}
            </button>
          </div>
        }

        <div className="all__part__container__alt">
          <div className="multisection__container">
            <div className={isMobile ? "mobile__multisection__title" : "multisection__title"}>
              Zoznamy vytiahnuté účastníkmi
            </div>
            <div className="section_list_container">
              {drawnWordsLists.drawnWordsLists?.map((drawnWordList : DrawnWordsList) => (
                <CompactWordDisplay
                title={drawnWordList.owner.username}
                items={drawnWordList.items}
                key={drawnWordList._id}
                sectionStyle="section__container"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MentorLessonPage;