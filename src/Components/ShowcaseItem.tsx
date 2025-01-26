import { Item } from "../model";
import "./styles.css";

type Props = {
  item: Item;
};

const ShowcaseItem = ({ item }: Props) => {
  return (
    <form className="items__single">
        <span className="items__single--text">{item.value}</span>
    </form>
  );
};

export default ShowcaseItem;
