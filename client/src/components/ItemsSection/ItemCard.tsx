import { memo, type FC } from 'react';
import type { Item } from '../../api/Item';
import './ItemCard.scss';

type ItemCardProps = {
  item: Item,
}

const ItemCard: FC<ItemCardProps> = memo(({ item }) => {
  return (
    <div className="item-card">
      {item.value.toLocaleString()}
    </div>
  )
})

export default ItemCard;