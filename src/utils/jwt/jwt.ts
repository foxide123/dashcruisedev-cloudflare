import { jwtVerify } from "jose";

export async function verifyJwt(token: string) {
  try {
    return jwtVerify(
      token,
      new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!)
    );
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}