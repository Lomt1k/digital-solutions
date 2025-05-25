import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FC, memo } from "react";
import { fetchSortItems } from "../../api/Item";
import { Button } from "..";
import { RootStore } from "../../store";

type SortButtonProps = {
  descending?: boolean;
}

const SortButton: FC<SortButtonProps> = ({ descending = false }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['sort', descending],
    mutationFn: fetchSortItems,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    }
  });

  const handleClick = () => {
    RootStore.items.setItems(undefined);
    RootStore.items.setPage(1);
    mutation.mutate(descending)
  }

  return (
    <Button onClick={handleClick} disabled={mutation.isPending}>
      {descending ? "По убыванию" : "По возрастанию"}
    </Button>
  )
}

export default memo(SortButton);