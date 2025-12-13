import z from "zod";

export const AuthenticationReqSchema = z.object({
  email: z.string(),
  password: z.string(),
});
