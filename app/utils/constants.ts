export const ROLES = {
  GUEST: "GUEST",
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_ROUTES: Record<Role, string> = {
  GUEST: "/login",
  STUDENT: "/student",
  ADMIN: "/admin",
  SUPERADMIN: "/superadmin",
};

export function getRoleRoute(role: Role): string {
  return ROLE_ROUTES[role] || "/login";
}

export function firstLetter(text: string): string {
  const arr = text.trim().split(" ");
  const first = arr[0]?.charAt(0) ?? "";
  const second = arr[1]?.charAt(0) ?? "";

  return first + second;
}
