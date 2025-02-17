import { db } from "../../db";
import { projects } from "../../db/schema";
import type { createProjectReqDto } from "./dtos/req/project";

export async function createProject({
  name,
  client,
  address,
  uf,
  house_number,
  status,
  area,
  price,
}: createProjectReqDto) {
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
    })
    .returning();

  const project = data[0];
  return {
    project,
  };
}
