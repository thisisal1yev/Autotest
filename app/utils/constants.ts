export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_ROUTES: Record<Role, string> = {
  USER: "/user",
  ADMIN: "/admin/dashboard",
  SUPERADMIN: "/superadmin",
};

export function getRoleRoute(role: Role): string {
  return ROLE_ROUTES[role] || "/login";
}

export function firstLetter(text: string): string {
  return text.charAt(0)
}
