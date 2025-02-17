import { eq } from "drizzle-orm";
import { db } from "../../db";
import { stocks } from "../../db/schema";
import type { StockResDto } from "./dtos/res/stocks-res";
import { CustomError } from "../../common/errors/customized.error";

export async function getStockById(stock_id: string): Promise<StockResDto> {
  const data: StockResDto[] = await db
    .select({
      id: stocks.id,
      name: stocks.name,
      stock_type: stocks.stock_type,
      quantity: stocks.quantity,
    })
    .from(stocks)
    .where(eq(stocks.id, stock_id));

  if (!data[0]) throw new CustomError("invalid stock id", 400);

  return data[0];
}
