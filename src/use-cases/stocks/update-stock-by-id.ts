import { eq } from "drizzle-orm";
import { db } from "../../db";
import { stocks } from "../../db/schema";
import type { UpdateStockRequestDto } from "./dtos/req/stock-req";
import type { StockResDto } from "./dtos/res/stocks-res";

export async function updateStockById({
  id,
  name,
  stock_type,
  quantity,
}: UpdateStockRequestDto): Promise<StockResDto> {
  const data = await db
    .update(stocks)
    .set({
      ...(name && { name }),
      ...(stock_type && { stock_type }),
      ...(quantity && { quantity }),
    })
    .where(eq(stocks.id, id))
    .returning();

  return data[0];
}
