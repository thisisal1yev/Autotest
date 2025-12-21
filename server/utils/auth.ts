import type { H3Event } from "h3";
import { verifyToken, type JWTPayload } from "./jwt";

export function getTokenFromCookie(event: H3Event): string | null {
  const token = getCookie(event, "auth-token");
  return token || null;
}

export async function getUserFromToken(event: H3Event): Promise<JWTPayload | null> {
  const token = getTokenFromCookie(event);
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export function setAuthCookie(event: H3Event, token: string): void {
  setCookie(event, "auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, "auth-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
}

