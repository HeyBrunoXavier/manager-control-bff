import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authentication } from "../../use-cases/authentication/singIn";

export const authenticationRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request) => {
      const { email, password } = request.body;

      return await authentication({
        email,
        password,
      });
    }
  );
};
