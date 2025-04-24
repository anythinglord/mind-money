import { z } from "zod";

const zodEmail = z.string()
    .min(12, "Must be at least 12 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])/, "Must include upper case letters")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
    .regex(/\d/, "Must contain at least one number")

export const userSchema = (isSignUp: boolean) => 
    z.object({
        email: z.string().email("Invalid email"),
        password: zodEmail,
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
        password: step === 3 ? zodEmail : z.optional(zodEmail),
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