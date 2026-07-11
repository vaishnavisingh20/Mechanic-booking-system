export type UserRole = "admin" | "mechanic" | "guest";

export function hasRole(
    role: UserRole,
    allowedRoles: UserRole[]
) {
    return allowedRoles.includes(role);
}