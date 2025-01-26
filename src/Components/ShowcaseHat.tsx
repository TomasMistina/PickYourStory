import { HatType, Item } from "../model";
import ShowcaseItemList from "./ShowcaseItemList";
import "./styles.css";

type Props = {
  hatType: HatType;
  hats: Item[][];
};

const ShowcaseHat = ({
  hatType,
  hats,
}: Props) => {

  let hatIndex = -1;
  switch (hatType) {
    case HatType.characters:
      hatIndex = 0;
      break;
    case HatType.magical_items:
      hatIndex = 1;
      break;
    case HatType.phrases:
      hatIndex = 2;
      break;
    default:
      break;
  }

  return (
    <div className="hat">
      <span className="hat__heading">{hatType}</span>
        <ShowcaseItemList
            items={hats[hatIndex]}
        />
    </div>
  );
};

export default ShowcaseHat;
