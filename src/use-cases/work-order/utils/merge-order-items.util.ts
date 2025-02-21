import type { itemsReqDto } from "../dtos/item";
import type { StockItemDto } from "../dtos/stock";

export function mergeOrderItems(
  stockOrders: StockItemDto[],
  orderList: itemsReqDto
): StockItemDto[] {
  const itemMap = new Map<string, StockItemDto>();

  for (const stockItem of stockOrders.items) {
    itemMap.set(stockItem.name, { ...stockItem });
  }

  for (const orderItem of orderList.items) {
    if (itemMap.has(orderItem.name)) {
      itemMap.get(orderItem.name)!.quantity += orderItem.quantity;
    } else {
      itemMap.set(orderItem.name, { ...orderItem });
    }
  }

  return Array.from(itemMap.values());
}
