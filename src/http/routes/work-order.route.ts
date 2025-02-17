import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createOrderByUser } from "../../use-cases/work-order/create-order-by-user";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import type { itemsReqDto } from "../../use-cases/work-order/dtos/item";

const itemsSchema = z.object({
  name: z.string(),
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
};
