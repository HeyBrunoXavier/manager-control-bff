import z from "zod";
import { stockTypeEnum } from "../dtos/req/stock-req";

export const CreateItemInStockReqZodSchema = z.object({
  name: z.string(),
  stock_type: z.enum([
    stockTypeEnum.materials,
    stockTypeEnum.equipments,
    stockTypeEnum.machines,
  ]),
  quantity: z.number(),
});

export const GetItemByIdInStockReqZodSchema = z.object({
  id: z.string(),
});
