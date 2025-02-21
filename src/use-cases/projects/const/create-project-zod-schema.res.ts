import z from "zod";
import { statusTypeEnum } from "../dtos/req/project";

export const CreateProjectReqSchema = z.object({
  name: z.string(),
  client: z.string(),
  address: z.string(),
  uf: z.string(),
  house_number: z.number(),
  status: z.enum([
    statusTypeEnum.initialized,
    statusTypeEnum.in_progress,
    statusTypeEnum.stopped,
    statusTypeEnum.finished,
  ]),
  area: z.number(),
  price: z.number(),
});

export const CreatedProjectResSchema = z.object({
  project: z.object({
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
  }),
});
