import { makeAutoObservable } from "mobx";
import type { Item } from "../api/Item";

export class ItemsStore {
  items: Item[] = [];
  page: number = 1;
  isPageLoaded: boolean = false;
  filterSearch: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setItems(items: Item[] | undefined) {
    items ??= [];
    this.items = this.page > 1 ? [...this.items, ...items] : items;
    this.isPageLoaded = !!items;
  }

  setFilterSearch(search: string) {
    this.filterSearch = search.toLowerCase();
    this.page = 1;
    this.isPageLoaded = false;
  }

  setPage(page: number) {
    this.page = page;
    this.isPageLoaded = false;
  }
}