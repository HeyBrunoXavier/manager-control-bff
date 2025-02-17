import { db } from "../../db";
import { stocks } from "../../db/schema";
import type { CreateStockRequestDto } from "./dtos/req/stock-req";

export async function createStock({
  name,
  stock_type,
  quantity,
}: CreateStockRequestDto) {
  const data = await db
    .insert(stocks)
    .values({
      name,
      stock_type,
      quantity,
    })
    .returning();

  const stock = data[0];
  return {
    stock,
  };
}
