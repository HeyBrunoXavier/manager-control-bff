import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { pgEnum } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";

export const realmEnum = pgEnum("type", [
  "owner",
  "sub_leader",
  "purchasing",
  "other",
]);

export const stockEnum = pgEnum("stock_type", [
  "materials",
  "equipments",
  "machines",
]);

export const statusEnum = pgEnum("status", [
  "initialized",
  "in progress",
  "stopped",
  "finished",
]);

export const realms = pgTable("realms", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  type: realmEnum("type").notNull(),
});

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  realmId: text("realm_id")
    .references(() => realms.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const stock_orders = pgTable("stock_orders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  items: jsonb("items").notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  projectId: text("project_id")
    .references(() => projects.id)
    .notNull(),
  order_date: timestamp("order_date", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const stocks = pgTable("stocks", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  stock_type: stockEnum("stock_type").notNull(),
  quantity: integer("quantity").notNull(),
});

export const projects = pgTable("projects", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  client: text("client").notNull(),
  address: text("address").notNull(),
  uf: text("uf").notNull(),
  house_number: integer("house_number").notNull(),
  status: statusEnum("status").notNull(),
  area: integer("area").notNull(),
  price: integer("price").notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
