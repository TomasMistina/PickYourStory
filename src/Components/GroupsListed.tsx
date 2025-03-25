import Card from "./Card";
import { GroupPreview} from "../model";
import CustomLinkCard from "./CustomLinkCard";

type GroupsProps = {
  Groups: GroupPreview[];
}

const GroupsListed = ({ Groups }: GroupsProps) => {
  return (
    <div className="scroll__container">
      <div className="hattheme_collection">
        {Groups?.map((Group: GroupPreview) => (
          <CustomLinkCard
            key={Group._id}
            title={Group.groupName}
            owner={null}
            customLink={`group/${Group._id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupsListed;