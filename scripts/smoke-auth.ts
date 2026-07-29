/**
 * Quick auth store smoke test — run with: npx tsx scripts/smoke-auth.ts
 */
import {
  createUser,
  findUserByEmail,
  verifyPassword,
  deleteUser,
} from "../src/lib/auth/users";
import { createToken, consumeToken } from "../src/lib/auth/tokens";

async function main() {
  const email = `test+${Date.now()}@example.com`;
  const password = "VeiligWachtwoord123!";

  const user = await createUser({
    email,
    firstName: "Test",
    lastName: "Gebruiker",
    password,
    marketingConsent: false,
  });
  console.log("register: ok");

  console.log("find: ok", !!(await findUserByEmail(email)));
  console.log("password verify: ok", await verifyPassword(user, password));
  console.log(
    "bad password: rejected",
    !(await verifyPassword(user, "wrong"))
  );

  const { token } = await createToken(user.id, "email_verify");
  console.log(
    "verify token: ok",
    !("error" in (await consumeToken(token, "email_verify")))
  );
  console.log(
    "token reuse: blocked",
    "error" in (await consumeToken(token, "email_verify"))
  );

  await deleteUser(user.id);
  console.log("delete: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
