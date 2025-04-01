import { useIsMobile } from "../mobile/useIsMobile";
import { HatType, Item } from "../model";
import ShowcaseItemList from "./ShowcaseItemList";
import "./styles.css";

type Props = {
  hatType: HatType;
  hats: Item[][];
  isShown?: boolean;
};

const ShowcaseHat = ({
  hatType,
  hats,
  isShown
}: Props) => {
  const isMobile = useIsMobile();

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
    <>
    {isMobile 
      ? 
      <>
      {isShown
        ? 
        <div className={"mobile__hat"+hatIndex}>
          <ShowcaseItemList
              items={hats[hatIndex]}
          />
        </div> 
        : 
        <>
        </>
      }
      </>
      :
      <div className="hat">
        <span className="hat__heading">{hatType}</span>
          <ShowcaseItemList
              items={hats[hatIndex]}
          />
      </div>
    }
  </>
  );
};

export default ShowcaseHat;
