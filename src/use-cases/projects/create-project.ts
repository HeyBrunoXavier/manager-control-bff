import { db } from "../../db";
import { projects } from "../../db/schema";
import { decodedToken } from "../../utils/create-token";
import type { CreateProjectReqDto } from "./dtos/req/project";
import type { CreatedProjectResDto } from "./dtos/res/project";

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
  }: CreateProjectReqDto
): Promise<CreatedProjectResDto> {
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
