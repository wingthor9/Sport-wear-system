// "use client"

// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { registerSchema } from "../validation"
// import { RegisterInput } from "../types"
// import { useAuth } from "../hooks"

// export function RegisterForm() {
//     const { register: registerUser, loading } = useAuth()

//     const form = useForm<RegisterInput>({
//         resolver: zodResolver(registerSchema)
//     })

//     const onSubmit = (data: RegisterInput) => {
//         registerUser(data)
//     }

//     return (
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

//             <input
//                 placeholder="Name"
//                 {...form.register("customer_name")}
//                 className="w-full border p-2 rounded"
//             />

//             <input
//                 placeholder="Email"
//                 {...form.register("email")}
//                 className="w-full border p-2 rounded"
//             />

//             <input
//                 type="password"
//                 placeholder="Password"
//                 {...form.register("password")}
//                 className="w-full border p-2 rounded"
//             />

//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-black text-white p-2 rounded"
//             >
//                 {loading ? "Loading..." : "Register"}
//             </button>

//         </form>
//     )
// }