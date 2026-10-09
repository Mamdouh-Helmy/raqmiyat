// lib/auth.js
// آمن للـ Edge (بيستورد jose بس)، فينفع يتستخدم في الـ middleware وفي الـ API.
import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const ALG = "HS256";

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
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

// Verifies a token, returns the payload or null if invalid/expired.
// algorithms: بيقبل HS256 بس، فمفيش token بخوارزمية تانية يعدّي.
// لو SESSION_SECRET ناقص بيرجّع null (يعني الدخول مقفول، مش مفتوح).
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: [ALG],
    });
    return payload;
  } catch {
    return null;
  }
}