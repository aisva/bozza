import { Item } from '../models/Item';

export interface GetItemsResponse {
  items: Array<Item>;
  nextKey?: string;
}
