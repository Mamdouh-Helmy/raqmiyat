import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();

function getSecret() {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not set in your environment.");
  }
  return encoder.encode(process.env.SESSION_SECRET);
}

export const SESSION_COOKIE = "admin_session";

// Signs a short-lived session token. Payload should stay minimal (no secrets).
export async function createSessionToken(payload = { role: "admin" }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

// Verifies a token, returns the payload or null if invalid/expired.
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}