import z from "zod";
import { stockTypeEnum } from "../../stocks/dtos/req/stock-req";

export const itemsSchema = z.object({
  name: z.string(),
  stock_type: z
    .enum([
      stockTypeEnum.materials,
      stockTypeEnum.equipments,
      stockTypeEnum.machines,
    ])
    .optional(),
  quantity: z.number(),
});
