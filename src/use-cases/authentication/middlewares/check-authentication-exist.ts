import type { FastifyRequest } from "fastify";
import { CustomError } from "../../../common/errors/customized.error";

export async function checkAuthorizationExists(request: FastifyRequest) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new CustomError("you are not logged", 401);
  }

  return authorization;
}
