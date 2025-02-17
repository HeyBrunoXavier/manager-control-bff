import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY: z.string(),
  NODE_PORT: z.string(),
});

export const env = envSchema.parse(process.env);
