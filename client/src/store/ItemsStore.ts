import { makeAutoObservable } from "mobx";
import type { Item } from "../api/Item";

export class ItemsStore {
  items: Item[] = [];
  lastPage: number = 0;
  filterSearch: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: Item[], page: number = 0) {
    this.items = page > 1 ? [...this.items, ...items] : items;
    this.lastPage = page;
  }

  setFilterSearch(search: string) {
    this.filterSearch = search.toLowerCase();
  }
}