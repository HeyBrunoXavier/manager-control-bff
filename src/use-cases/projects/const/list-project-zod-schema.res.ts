import z from "zod";

export const ListProjectResSchema = z.object({
  projects: z.array(
    z.object({
      name: z.string(),
      client: z.string(),
      address: z.string(),
      uf: z.string(),
      house_number: z.number(),
      status: z.string(),
      area: z.number(),
      price: z.number(),
      userId: z.string().optional(),
      createdAt: z.coerce.date().optional(),
    })
  ),
});
