import type { stockTypeEnum } from "../../stocks/dtos/req/stock-req";

export interface item {
  name: string;
  quantity: number;
  stock_type?: stockTypeEnum;
}

export interface itemsReqDto {
  items: item[];
}
