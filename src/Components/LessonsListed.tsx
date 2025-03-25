import Card from "./Card";
import { LessonPreview } from "../model";
import CustomLinkCard from "./CustomLinkCard";

type LessonsProps = {
  Lessons: LessonPreview[];
}

const LessonsListed = ({ Lessons }: LessonsProps) => {
  return (
    <div className="scroll__container">
      <div className="hattheme_collection">
        {Lessons?.map((Lesson: LessonPreview) => (
          <CustomLinkCard
            key={Lesson._id}
            title={Lesson.lessonName}
            owner={null}
            customLink={`./../../lesson/${Lesson._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsListed;