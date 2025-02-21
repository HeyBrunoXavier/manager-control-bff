import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { checkAuthorizationExists } from "../../use-cases/authentication/middlewares/check-authentication-exist";
import { createProject } from "../../use-cases/projects/create-project";
import { listProjects } from "../../use-cases/projects/get-list-projects";
import { handleError } from "../../common/errors/customized.error";
import {
  CreatedProjectResSchema,
  CreateProjectReqSchema,
} from "../../use-cases/projects/const/create-project-zod-schema.res";
import { ListProjectResSchema } from "../../use-cases/projects/const/list-project-zod-schema.res";

export const projectRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        summary: "create project by users",
        tags: ["Project"],
        headers: z.object({
          authorization: z.string(),
        }),
        body: CreateProjectReqSchema,
        response: {
          201: CreatedProjectResSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async (request, reply) => {
      try {
        const { name, client, address, uf, house_number, status, area, price } =
          request.body;

        const { authorization } = request.headers;

        const project = await createProject(authorization, {
          name,
          client,
          address,
          uf,
          house_number,
          status,
          area,
          price,
        });

        return reply.code(201).send(project);
      } catch (error) {
        handleError(error);
      }
    }
  );

  app.get(
    "/",
    {
      schema: {
        summary: "list projects by users",
        tags: ["Project"],
        headers: z.object({
          authorization: z.string(),
        }),
        response: {
          200: ListProjectResSchema,
        },
      },
      preHandler: [checkAuthorizationExists],
    },
    async () => {
      return await listProjects();
    }
  );

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
