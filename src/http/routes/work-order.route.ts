import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createOrderByUser } from "../../use-cases/work-order/create-order-by-user";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import type { itemsReqDto } from "../../use-cases/work-order/dtos/item";
import { updateOrderByUser } from "../../use-cases/work-order/update-order-by-user";
import { stockTypeEnum } from "../../use-cases/stocks/dtos/req/stock-req";

const itemsSchema = z.object({
  name: z.string(),
  stock_type: z
    .enum([stockTypeEnum.equipments, stockTypeEnum.machines])
    .optional(),
  quantity: z.number(),
});

export const workOrderRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        headers: z.object({
          authorization: z.string(),
        }),
        body: z.object({
          items: z.array(itemsSchema),
        }),
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      const { authorization } = request.headers;
      const items: itemsReqDto = request.body;

      return await createOrderByUser(authorization, items);
    }
  );

  app.put(
    "/:order_id",
    {
      schema: {
        params: z.object({
          order_id: z.string(),
        }),
        body: z.object({
          items: z.array(itemsSchema),
        }),
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
