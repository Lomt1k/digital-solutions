import { memo, useCallback, type FormEventHandler } from "react";
import { RootStore } from "../../store";
import './ItemsSearch.scss';

const ItemsSearch = () => {
  const handleInputChange: FormEventHandler<HTMLInputElement> = useCallback((e) => {
    RootStore.items.setFilterSearch(e.currentTarget.value);
    RootStore.items.setPage(1);
  }, []);

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