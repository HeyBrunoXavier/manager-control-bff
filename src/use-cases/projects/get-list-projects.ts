import { db } from "../../db";
import { projects } from "../../db/schema";
import type { ListProjectResDto, ProjectResDto } from "./dtos/res/project";

export async function listProjects(): Promise<ListProjectResDto> {
  const data: ProjectResDto[] = await db.select().from(projects);

  return {
    projects: data,
  };
}
