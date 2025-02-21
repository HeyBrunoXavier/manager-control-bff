import { db } from "../../db";
import { projects } from "../../db/schema";
import { decodedToken } from "../../utils/create-token";
import type { createProjectReqDto } from "./dtos/req/project";

export async function createProject(
  authorization: string,
  {
    name,
    client,
    address,
    uf,
    house_number,
    status,
    area,
    price,
  }: createProjectReqDto
) {
  const userId = await decodedToken(authorization);
  const data = await db
    .insert(projects)
    .values({
      name,
      client,
      address,
      uf,
      house_number,
      status,
      area,
      price,
      userId,
    })
    .returning();

  const project = data[0];
  return {
    project,
  };
}
