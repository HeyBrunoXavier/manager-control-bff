import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { projects } from "../../../db/schema";

export async function shouldProjectOfUser(user_id: string) {
  const project = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.userId, user_id))
    .execute();

  return project[0].id;
}
