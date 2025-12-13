import z from "zod";

export const CreateItemInStockResZodSchema = z.object({
  stock: z.object({
    id: z.string(),
    name: z.string(),
    stock_type: z.string(),
    quantity: z.number(),
  }),
});

export const GetItemByIdInStockResZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  stock_type: z.string(),
  quantity: z.number(),
});

export const ListItemsInStockResZodSchema = z.object({
  stocks: z.object({
    materials: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        stock_type: z.string(),
        quantity: z.number(),
      })
    ),
    equipments: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        stock_type: z.string(),
        quantity: z.number(),
      })
    ),
    machines: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        stock_type: z.string(),
        quantity: z.number(),
      })
    ),
  }),
});
