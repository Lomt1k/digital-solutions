import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../api/Item";

export const useItemsPage = (search: string, page: number) => {
  return useQuery({ 
    queryKey: ['items', search, page],
    queryFn: () => fetchItems(search, page),
  });
}