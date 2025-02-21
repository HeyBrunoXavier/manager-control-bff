import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authentication } from "../../use-cases/authentication/singIn";
import { handleError } from "../../common/errors/customized.error";

export const authenticationRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        summary: "authenticate user",
        tags: ["Auth"],
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
        response: {
          201: z.object({ token: z.string() }),
        },
      },
    },
    async (request) => {
      try {
        const { email, password } = request.body;

        return await authentication({
          email,
          password,
        });
      } catch (error) {
        handleError(error);
      }
    }
  );
};
