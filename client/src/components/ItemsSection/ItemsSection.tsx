import './ItemsSection.scss';
import { Container } from '..';
import { observer } from 'mobx-react-lite';
import { RootStore } from '../../store';
import { useItemsPage } from '../../hooks';
import { useEffect } from 'react';

const ItemsSection = observer(() => {
  const { page, filterSearch } = RootStore.items;
  const { data, isFetching, isError } = useItemsPage(filterSearch, page);
  useEffect(() => RootStore.items.setItems(data), [data]);

  return (
    <section className="items-section">
      <Container>
        <div className="items-section__wrapper">
          <div className="item-section__filters">
            FILTERS
          </div>
          {data && data.map(e => (
            <div key={e.value}>
              {e.value}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
})

export default ItemsSection;