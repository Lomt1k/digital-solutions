import { useMutation } from "@tanstack/react-query";
import { type FC, memo } from "react";
import { fetchSortItems } from "../../api/Item";
import { Button } from "..";
import { RootStore } from "../../store";

type SortButtonProps = {
  descending?: boolean;
}

const SortButton: FC<SortButtonProps> = ({ descending = false }) => {
  const mutation = useMutation({
    mutationKey: ['sort'],
    mutationFn: fetchSortItems,
    onSuccess() {
      RootStore.items.setPage(1);
    }
  });

  const handleClick = () => {
    mutation.mutate(descending);
  }

  return (
    <Button onClick={handleClick} disabled={mutation.isPending}>
      {descending ? "По убыванию" : "По возрастанию"}
    </Button>
  )
}

export default memo(SortButton);