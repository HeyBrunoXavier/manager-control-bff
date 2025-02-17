import { CustomError } from "../common/errors/customized.error";
import type { AvailableItemsInStockResponseDto } from "../use-cases/work-order/create-order-by-user";
import type { itemsReqDto } from "../use-cases/work-order/dtos/item";
import type { StockItemDto } from "../use-cases/work-order/dtos/stock";

export function validateItems(
  bodyItems: itemsReqDto,
  stockItems: StockItemDto[]
): AvailableItemsInStockResponseDto {
  const availableItemsInStock = [];
  for (const bodyItem of bodyItems.items) {
    const stockItem = stockItems.find((stock) => stock.name === bodyItem.name);

    if (!stockItem) {
      throw new CustomError(`Item ${bodyItem.name} no exist in stock.`, 400);
    }

    if (bodyItem.quantity > stockItem.quantity) {
      throw new CustomError(
        `Insufficient quantity for item ${bodyItem.name}. quantity in stock: ${stockItem.quantity}.`,
        400
      );
    }
    availableItemsInStock.push({
      id: stockItem.id,
      name: stockItem.name,
      stock_type: stockItem.stock_type,
      quantity: stockItem.quantity - bodyItem.quantity,
    });
  }

  return {
    availableItemsInStock,
  };
}
