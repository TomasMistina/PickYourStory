import { Item } from "../model";
import ShowcaseItem from "./ShowcaseItem";
import "./styles.css";

type Props = {
  items: Item[];
};

const ShowcaseItemList = ({ items }: Props) => {
  return (
    <div className="items__container">
      <div className="items">
        {items.map((item) => (
          <ShowcaseItem
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowcaseItemList;
