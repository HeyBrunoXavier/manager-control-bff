import { eq } from "drizzle-orm";
import { db } from "../../db";
import { stocks } from "../../db/schema";
import type { StockResDto } from "./dtos/res/stocks-res";

export async function deleteStockById(id: string): Promise<StockResDto> {
  const data = await db.delete(stocks).where(eq(stocks.id, id)).returning();

  return data[0];
}
