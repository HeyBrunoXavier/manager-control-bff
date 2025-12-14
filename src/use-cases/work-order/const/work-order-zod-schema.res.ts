import z from "zod";

export const CreateWorkOrderResZodSchema = z.string();

export const WorkOrderItemZodSchema = z.object({
  name: z.string(),
  quantity: z.number().int().nonnegative(),
  stock_type: z.string().optional(),
});

export const ListWorkOrderByUserZodSchema = z.object({
  id: z.string(),
  items: z.array(WorkOrderItemZodSchema),
  created_at: z.string(),
});
