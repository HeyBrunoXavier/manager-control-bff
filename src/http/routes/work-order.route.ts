import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createOrderByUser } from "../../use-cases/work-order/create-order-by-user";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import type { itemsReqDto } from "../../use-cases/work-order/dtos/item";
import { updateOrderByUser } from "../../use-cases/work-order/update-order-by-user";
import {
  CreateWorkOrderResZodSchema,
  ListWorkOrderByUserZodSchema,
} from "../../use-cases/work-order/const/work-order-zod-schema.res";
import { itemsSchema } from "../../use-cases/work-order/const/work-order-zod-schema.req";
import { listOrderByUser } from "../../use-cases/work-order/list-order-by-user";

export const workOrderRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        summary: "create work orders",
        tags: ["Work Order"],
        headers: z.object({
          authorization: z.string(),
        }),
        body: z.object({
          items: z.array(itemsSchema),
        }),
        response: {
          201: CreateWorkOrderResZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      const { authorization } = request.headers;
      const items: itemsReqDto = request.body;

      return await createOrderByUser(authorization, items);
    }
  );

  app.get(
    "/",
    {
      schema: {
        summary: "list work orders by user",
        tags: ["Work Order"],
        headers: z.object({
          authorization: z.string(),
        }),
        response: {
          200: ListWorkOrderByUserZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      const { authorization } = request.headers;
      return await listOrderByUser(authorization);
    }
  );

  app.put(
    "/:order_id",
    {
      schema: {
        summary: "update work orders",
        tags: ["Work Order"],
        params: z.object({
          order_id: z.string(),
        }),
        body: z.object({
          items: z.array(itemsSchema),
        }),
        response: {
          201: CreateWorkOrderResZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      const items: itemsReqDto = request.body;
      const { order_id } = request.params;

      return await updateOrderByUser(items, order_id);
    }
  );
};
