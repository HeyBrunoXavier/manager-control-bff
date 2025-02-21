import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { stock_orders, stocks } from "../../../db/schema";
import type { AvailableItemsInStockResponseDto } from "../create-order-by-user";

export async function getStockOrderItems(order_id: string) {
  const result = await db
    .select({ items: stock_orders.items })
    .from(stock_orders)
    .where(eq(stock_orders.id, order_id))
    .execute();

  return result[0]?.items ?? [];
}

export async function updateStockQuantities(
  data: AvailableItemsInStockResponseDto
) {
  const updatePromises = data.availableItemsInStock.map((item) =>
    db
      .update(stocks)
      .set({ quantity: item.quantity })
      .where(eq(stocks.id, item.id))
      .execute()
  );

  await Promise.all(updatePromises);
}
