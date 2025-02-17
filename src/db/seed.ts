import { client, db } from ".";
import { encryptingPassword } from "../utils/encrypted-and-check-password.util";
import { realms, users } from "./schema";
import dayjs from "dayjs";

async function seed() {
  await db.delete(users);
  await db.delete(realms);

  const result = await db
    .insert(realms)
    .values([{ type: "owner" }, { type: "sub_leader" }, { type: "purchasing" }])
    .returning();

  const startOffWeek = dayjs().startOf("week");

  await db.insert(users).values([
    {
      name: "admin",
      email: "admin@bgsofthouse.com",
      password: await encryptingPassword("admin"),
      createdAt: startOffWeek.toDate(),
      realmId: result[0].id,
    },
    {
      name: "dev",
      email: "dev@bgsofthouse.com",
      password: await encryptingPassword("dev"),
      createdAt: startOffWeek.toDate(),
      realmId: result[1].id,
    },
  ]);
}

seed().finally(() => {
  client.end();
});
