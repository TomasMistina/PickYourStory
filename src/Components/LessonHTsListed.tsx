import Card from "./Card";
import { LessonHatThemePreview} from "../model";

type LessonHTsProps = {
  LessonHTs: LessonHatThemePreview[];
}

const LessonHTsListed = ({ LessonHTs }: LessonHTsProps) => {
    console.log(LessonHTs)
  return (
    <div className="scroll__container">
      <div className="hattheme_collection">
        {LessonHTs?.map((LessonHT: LessonHatThemePreview) => (
          <Card
            key={LessonHT._id}
            title={LessonHT.hatTheme.title}
            owner={null}
            id={LessonHT._id}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonHTsListed;