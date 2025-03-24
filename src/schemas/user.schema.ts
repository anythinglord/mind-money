import { z } from "zod";

export const userSchema = (isSignUp: boolean) => 
    z.object({
        email: z.string().email("Invalid email"),
        password: z.string()
            .min(12, "Must be at least 12 characters long")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])/, "Must include upper case letters")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
            .regex(/\d/, "Must contain at least one number"),
        confirm: isSignUp ? z.string() : z.optional(z.string()),
    }).refine((data) => {
        if (isSignUp && data.password !== data.confirm) {
            return false;
        }
        return true;
    }, {
        message: "Passwords must match",
        path: ["confirm"],
    });