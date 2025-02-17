import { hash, compare } from "bcryptjs";
import { CustomError } from "../common/errors/customized.error";

export async function encryptingPassword(password: string) {
  return await hash(password, 6);
}

export async function checkingPassword(password: string, hashPassword: string) {
  const checkPassword = await compare(password, hashPassword);

  if (checkPassword === false)
    throw new CustomError("verify if your email or password is correct!", 401);

  return checkPassword;
}
