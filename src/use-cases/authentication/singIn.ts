import { db } from "../../db";
import { realms, users } from "../../db/schema";
import { eq } from "drizzle-orm";
import type { AuthenticationRequestDto } from "./dtos/req/authentication-req.dto";
import { checkingPassword } from "../../utils/encrypted-and-check-password.util";
import {
  createToken,
  type PayloadCreatedTokenDto,
} from "../../utils/create-token";

interface AuthenticationResponseDto {
  token: string;
}

export async function authentication({
  email,
  password,
}: AuthenticationRequestDto): Promise<AuthenticationResponseDto> {
  const data = await db
    .select()
    .from(realms)
    .innerJoin(users, eq(realms.id, users.realmId))
    .where(eq(users.email, email));

  await checkingPassword(password, data[0].users.password);
  const payload: PayloadCreatedTokenDto = {
    id: data[0].users.id,
    name: data[0].users.name,
    email,
    realm: data[0].realms.type,
  };

  const token = await createToken(payload);

  return {
    token,
  };
}
