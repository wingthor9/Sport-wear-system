export const isAdmin = (role?: string) => {
    return role === "ADMIN" || role === "STAFF"
}

// export const getRedirectPath = (role?: string) => {
//     if (role === "ADMIN" || role === "STAFF") {
//         return "/dashboard"
//     }
//     return "/auth/login"
// }


export type UserRole = "ADMIN" | "STAFF" 

export function getRedirectPath(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "/dashboard"

    case "STAFF":
      return "/pos"

    default:
      return "/"
  }
}