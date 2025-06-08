/* import * as jose from 'jose'

export async function SignJsonWebTokens() {
  const secret = new TextEncoder().encode(process.env.HS256_SECRET);

  const alg = "HS256";

  const jwt = await new jose.SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime("2h")
    .sign(secret);
}
 */