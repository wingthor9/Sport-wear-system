export const isAdmin = (role?: string) => {
    return role === "ADMIN" || role === "STAFF"
}

export const getRedirectPath = (role?: string) => {
    if (role === "ADMIN" || role === "STAFF") {
        return "/dashboard"
    }
    return "/auth/login"
}