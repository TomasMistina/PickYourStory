import Card from "./Card";
import { LessonPreview } from "../model";

type LessonsProps = {
  Lessons: LessonPreview[];
}

const LessonsListed = ({ Lessons }: LessonsProps) => {
  return (
    <div className="scroll__container">
      <div className="hattheme_collection">
        {Lessons?.map((Lesson: LessonPreview) => (
          <Card
            key={Lesson._id}
            title={Lesson.lessonName}
            owner={null}
            id={Lesson._id}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsListed;