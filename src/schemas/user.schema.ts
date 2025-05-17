import { z } from "zod";

const zodPassword = z.string()
    .min(12, "Must be at least 12 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, "Must include upper case letters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
    .regex(/\d/, "Must contain at least one number")

export const userSchema = (isSignUp: boolean) => 
    z.object({
        email: z.string().email("Invalid email"),
        password: zodPassword,
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

export const recoverAccountSchema = (step: number) =>
    z.object({
        email: z.string().email("Invalid email"),
        input1: step === 2 ? z.string() : z.optional(z.string()),
        input2: step === 2 ? z.string() : z.optional(z.string()),
        input3: step === 2 ? z.string() : z.optional(z.string()),
        input4: step === 2 ? z.string() : z.optional(z.string()),
        input5: step === 2 ? z.string() : z.optional(z.string()),
        input6: step === 2 ? z.string() : z.optional(z.string()),
        password: step === 3 ? zodPassword : z.optional(zodPassword),
        confirm: step === 3 ? z.string() : z.optional(z.string()),
    }).refine((data) => {
        if (step === 3 && data.password !== data.confirm) {
            return false;
        }
        return true;
    }, {
        message: "Passwords must match",
        path: ["confirm"],
    });