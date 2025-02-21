import { db } from "../../db";
import { stock_orders, stocks } from "../../db/schema";
import { decodedToken } from "../../utils/create-token";
import { validateItems } from "../../utils/validate-items-in-stock";
import type { StockItemDto } from "./dtos/stock";
import type { itemsReqDto } from "./dtos/item";
import { updateStockQuantities } from "./repositories/stock.repository";
import { shouldProjectOfUser } from "./repositories/project.repository";

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

  const projectId = await shouldProjectOfUser(userId);

  await updateStockQuantities(data);
  await db
    .insert(stock_orders)
    .values({
      userId,
      projectId,
      items,
    })
    .execute();

  return "order created successfully";
}
