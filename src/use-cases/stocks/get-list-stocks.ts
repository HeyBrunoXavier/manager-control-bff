import { db } from "../../db";
import { stocks } from "../../db/schema";
import { getStocksGroupedByType } from "../../utils/get-stocks-grouped-by-type";
import type { StockResDto, StockListResDto } from "./dtos/res/stocks-res";

export async function listStocks(): Promise<StockListResDto> {
  const data: StockResDto[] = await db
    .select({
      id: stocks.id,
      name: stocks.name,
      stock_type: stocks.stock_type,
      quantity: stocks.quantity,
    })
    .from(stocks)
    .orderBy(stocks.stock_type, stocks.name);

  const groupedStocks = getStocksGroupedByType(data);
  return {
    stocks: groupedStocks,
  };
}
