import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createStock } from "../../use-cases/stocks/create-stock";
import { stockTypeEnum } from "../../use-cases/stocks/dtos/req/stock-req";
import { listStocks } from "../../use-cases/stocks/get-list-stocks";
import { getStockById } from "../../use-cases/stocks/get-stock-by-id";
import { updateStockById } from "../../use-cases/stocks/update-stock-by-id";
import { deleteStockById } from "../../use-cases/stocks/delete-stock-by-id";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import { handleError } from "../../common/errors/customized.error";
import {
  CreateItemInStockResZodSchema,
  GetItemByIdInStockResZodSchema,
  ListItemsInStockResZodSchema,
} from "../../use-cases/stocks/const/stock-zod-schema.res";
import {
  CreateItemInStockReqZodSchema,
  GetItemByIdInStockReqZodSchema,
} from "../../use-cases/stocks/const/stock-zod-schema.req";

export const stockRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        summary: "create item in stock",
        tags: ["Stock"],
        body: CreateItemInStockReqZodSchema,
        response: {
          201: CreateItemInStockResZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      try {
        const { name, stock_type, quantity } = request.body;

        return await createStock({
          name,
          stock_type,
          quantity,
        });
      } catch (error) {
        handleError(error);
      }
    }
  );

  app.get(
    "/",
    {
      schema: {
        summary: "get list of items in stock",
        tags: ["Stock"],
        response: {
          200: ListItemsInStockResZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async () => {
      return await listStocks();
    }
  );

  app.get(
    "/:id",
    {
      schema: {
        summary: "get item for id",
        tags: ["Stock"],
        params: GetItemByIdInStockReqZodSchema,
        response: {
          200: GetItemByIdInStockResZodSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request) => {
      try {
        const { id } = request.params;
        return await getStockById(id);
      } catch (error) {
        handleError(error);
      }
    }
  );

  app.put(
    "/:id",
    {
      schema: {
        summary: "update item for id",
        tags: ["Stock"],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          stock_type: z.enum([
            stockTypeEnum.materials,
            stockTypeEnum.equipments,
            stockTypeEnum.machines,
          ]),
          quantity: z.number(),
        }),
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { name, stock_type, quantity } = request.body;

        return await updateStockById({
          id,
          name,
          stock_type,
          quantity,
        });
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.delete(
    "/:id",
    {
      schema: {
        summary: "delete item for id",
        tags: ["Stock"],
        params: z.object({
          id: z.string(),
        }),
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        return await deleteStockById(id);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
};
