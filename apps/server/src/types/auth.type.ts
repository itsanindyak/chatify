import {z} from "zod"


const signUpSchema = z.object({
    username:z
        .string()
        .min(3,"Username must br atleast 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: z
        .string()
        .email("Invalid username"),

    password: z
        .string()
        .min(8,"Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
          )

})

type signUpRequest = z.infer<typeof signUpSchema>

const logInSchema = z.object({
    email: z
        .string()
        .email("Invalid username"),

    password: z
        .string()
        .min(1,"Password required")

})

type logInRequest = z.infer<typeof logInSchema>


export {
    signUpRequest,
    signUpSchema,
    logInRequest,
    logInSchema
}