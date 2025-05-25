import { observer } from "mobx-react-lite";
import { RootStore } from "../../store";
import ItemCard from "./ItemCard";
import './ItemCardList.scss';

const ItemCardList = observer(() => {
  const items = RootStore.items.items;
  
  return (
    <ul className="item-card-list">
      {items.map((item) => (
        <li key={item.value}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  )
})

export default ItemCardList;