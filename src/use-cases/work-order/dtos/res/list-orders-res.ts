import { item } from "../item";

export interface ListOrdersResDto {
  id: string;
  items: item[];
  created_at: string;
}
