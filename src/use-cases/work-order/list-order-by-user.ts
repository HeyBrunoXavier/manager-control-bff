import { db } from "../../db";
import { stock_orders } from "../../db/schema";
import { eq } from "drizzle-orm";
import { decodedToken } from "../../utils/create-token";
import { ListOrdersResDto } from "./dtos/res/list-orders-res";

export async function listOrderByUser(
  authorization: string
): Promise<ListOrdersResDto> {
  const userId = await decodedToken(authorization);
  const response = await db
    .select({
      id: stock_orders.id,
      items: stock_orders.items,
      order_date: stock_orders.order_date,
    })
    .from(stock_orders)
    .where(eq(stock_orders.userId, userId))
    .execute();

  const date = response[0].order_date.toLocaleString("pt-BR", {
    dateStyle: "short",
  });

  return {
    id: response[0].id,
    items: response[0].items?.items,
    created_at: date,
  };
}
