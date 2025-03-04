import Card from "./Card";
import { GroupPreview} from "../model";

type GroupsProps = {
  Groups: GroupPreview[];
}

const GroupsListed = ({ Groups }: GroupsProps) => {
  return (
    <div className="scroll__container">
      <div className="hattheme_collection">
        {Groups?.map((Group: GroupPreview) => (
          <Card
            key={Group._id}
            title={Group.groupName}
            owner={null}
            id={Group._id}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupsListed;