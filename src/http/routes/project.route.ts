import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import { statusTypeEnum } from "../../use-cases/projects/dtos/req/project";
import { createProject } from "../../use-cases/projects/create-project";
import { listProjects } from "../../use-cases/projects/get-list-projects";

export const projectRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: z.object({
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
        }),
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request, reply) => {
      try {
        const { name, client, address, uf, house_number, status, area, price } =
          request.body;

        return await createProject({
          name,
          client,
          address,
          uf,
          house_number,
          status,
          area,
          price,
        });
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  app.get("/", { preHandler: [checkAuthorizationExists] }, async () => {
    return await listProjects();
  });

  // app.get(
  //   "/:id",
  //   {
  //     schema: {
  //       params: z.object({
  //         id: z.string(),
  //       }),
  //     },
  //     preHandler: [checkAuthorizationExists],
  //   },
  //   async (request, reply) => {
  //     try {
  //       const { id } = request.params;
  //       return await getStockById(id);
  //     } catch (error) {
  //       return reply.status(500).send(error);
  //     }
  //   }
  // );

  // app.put(
  //   "/:id",
  //   {
  //     schema: {
  //       params: z.object({
  //         id: z.string(),
  //       }),
  //       body: z.object({
  //         name: z.string(),
  //         stock_type: z.enum([
  //           stockTypeEnum.materials,
  //           stockTypeEnum.equipments,
  //           stockTypeEnum.machines,
  //         ]),
  //         quantity: z.number(),
  //       }),
  //     },
  //     preHandler: [checkAuthorizationExists],
  //   },
  //   async (request, reply) => {
  //     try {
  //       const { id } = request.params;
  //       const { name, stock_type, quantity } = request.body;

  //       return await updateStockById({
  //         id,
  //         name,
  //         stock_type,
  //         quantity,
  //       });
  //     } catch (error) {
  //       return reply.status(500).send(error);
  //     }
  //   }
  // );

  // app.delete(
  //   "/:id",
  //   {
  //     schema: {
  //       params: z.object({
  //         id: z.string(),
  //       }),
  //     },
  //     preHandler: [checkAuthorizationExists],
  //   },
  //   async (request, reply) => {
  //     try {
  //       const { id } = request.params;
  //       return await deleteStockById(id);
  //     } catch (error) {
  //       return reply.status(500).send(error);
  //     }
  //   }
  // );
};
