import { eq } from "drizzle-orm";
import { db } from "../../db";
import { stock_orders, stocks } from "../../db/schema";
import { validateItems } from "../../utils/validate-items-in-stock";
import type { StockItemDto } from "./dtos/stock";
import type { itemsReqDto } from "./dtos/item";
import { mergeOrderItems } from "./utils/merge-order-items.util";
import {
  getStockOrderItems,
  updateStockQuantities,
} from "./repositories/stock.repository";

export interface AvailableItemsInStockResponseDto {
  availableItemsInStock: StockItemDto[];
}

export async function updateOrderByUser(
  orderList: itemsReqDto,
  order_id: string
) {
  const stockItems = await db
    .select({
      id: stocks.id,
      name: stocks.name,
      stock_type: stocks.stock_type,
      quantity: stocks.quantity,
    })
    .from(stocks);

  const validatedData: AvailableItemsInStockResponseDto = validateItems(
    orderList,
    stockItems
  );

  await updateStockQuantities(validatedData);

  let stockOrders = await getStockOrderItems(order_id);
  stockOrders = mergeOrderItems(stockOrders, orderList);

  const updateOrder = {
    items: stockOrders,
  };

  await db
    .update(stock_orders)
    .set({ items: updateOrder })
    .where(eq(stock_orders.id, order_id))
    .execute();

  return "Order updated successfully";
}
