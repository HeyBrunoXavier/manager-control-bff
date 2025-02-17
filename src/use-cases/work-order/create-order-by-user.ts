import { eq } from "drizzle-orm";
import { db } from "../../db";
import { stock_orders, stocks } from "../../db/schema";
import { decodedToken } from "../../utils/create-token";
import { validateItems } from "../../utils/validate-items-in-stock";
import type { StockItemDto } from "./dtos/stock";
import type { itemsReqDto } from "./dtos/item";

export interface AvailableItemsInStockResponseDto {
  availableItemsInStock: StockItemDto[];
}

export async function createOrderByUser(
  authorization: string,
  items: itemsReqDto
) {
  const userId = await decodedToken(authorization);

  const stockItems = await db
    .select({
      id: stocks.id,
      name: stocks.name,
      stock_type: stocks.stock_type,
      quantity: stocks.quantity,
    })
    .from(stocks);

  const data: AvailableItemsInStockResponseDto = validateItems(
    items,
    stockItems
  );

  await updateQuantityFromStocks(data);
  await db
    .insert(stock_orders)
    .values({
      userId,
      items,
    })
    .execute();

  return "order created successfully";
}

async function updateQuantityFromStocks(
  data: AvailableItemsInStockResponseDto
) {
  for (const item of data.availableItemsInStock) {
    await db
      .update(stocks)
      .set({ quantity: item.quantity })
      .where(eq(stocks.id, item.id))
      .execute();
  }
}
