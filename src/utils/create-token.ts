import jwt from "jsonwebtoken";
import { env } from "../config/env";
import jwtDecode from "jwt-decode";

export type PayloadCreatedTokenDto = {
  id: string;
  name: string;
  email: string;
  realm: string;
};

export async function createToken({
  id,
  name,
  email,
  realm,
}: PayloadCreatedTokenDto): Promise<string> {
  const payload = {
    id,
    name,
    email,
    realm,
  };

  const token = jwt.sign(payload, env.SECRET_KEY as string, {
    expiresIn: 1000 * 60 * 60 * 24 * 7,
  });

  return token;
}

export async function decodedToken(token: string) {
  const authorization = token.split(" ")[1];
  const { id } = jwtDecode(authorization);
  return id;
}
