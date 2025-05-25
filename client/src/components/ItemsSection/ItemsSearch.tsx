import { memo, type FormEventHandler } from "react";
import { RootStore } from "../../store";
import './ItemsSearch.scss';

const handleInputChange: FormEventHandler<HTMLInputElement> = (e) => {
  RootStore.items.setFilterSearch(e.currentTarget.value);
}

const ItemsSearch = () => {
  return (
    <input
      className="items-search"
      type="search"
      placeholder="Поиск"
      onInput={handleInputChange}
    />
  )
}

export default memo(ItemsSearch);