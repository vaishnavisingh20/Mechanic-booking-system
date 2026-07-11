export type Role =
    | "admin"
    | "mechanic"
    | "guest";

export function canCreate(role?: Role) {
    return role === "admin" || role === "mechanic";
}

export function canEdit(role?: Role) {
    return role === "admin" || role === "mechanic";
}

export function canDelete(role?: Role) {
    return role === "admin";
}

export function canExport(role?: Role) {
    return role === "admin" || role === "mechanic";
}

export function canManageUsers(role?: Role) {
    return role === "admin";
}

export function canViewSettings(role?: Role) {
    return role === "admin";
}