import './ItemsSection.scss';
import { Container } from '..';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../store';
import { useCallbackOnScroll, useItemsPage } from '../../hooks';
import { useCallback, useEffect } from 'react';
import ItemCardList from './ItemCardList';

const ItemsSection = observer(() => {
  const { page, filterSearch, isPageLoaded } = RootStore.items;
  const { data, isFetching, isError } = useItemsPage(filterSearch, page);
  useEffect(() => RootStore.items.setItems(data), [data]);

  const handleScrollToBottomPage = useCallback(() => {
    if (!isPageLoaded) return;
    RootStore.items.setPage(page + 1);
  }, [isPageLoaded]);
  useCallbackOnScroll(80, handleScrollToBottomPage, [handleScrollToBottomPage]);

  return (
    <section className="items-section">
      <Container>
        <div className="items-section__wrapper">
          <div className="item-section__filters">
            FILTERS
          </div>
          <ItemCardList />
          {isFetching && <span>Загрузка...</span>}
          {isError && <span>При загрузке данных произошла ошибка&nbsp;🙄</span>}
        </div>
      </Container>
    </section>
  )
})

export default ItemsSection;