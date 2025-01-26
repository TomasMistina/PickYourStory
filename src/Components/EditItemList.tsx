import { Item } from "../model";
import EditItem from "./EditItem";
import "./styles.css";

type Props = {
  items: Item[];
  updateItem: (id: string, value: string) => void;
  deleteItem: (id: string) => void;
};

const EditItemList = ({ items, updateItem, deleteItem}: Props) => {
  return (
    <div className="items__container">
      <div className="items">
        {items.map((item) => (
          <EditItem
            item={item}
            key={item.id}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default EditItemList;
